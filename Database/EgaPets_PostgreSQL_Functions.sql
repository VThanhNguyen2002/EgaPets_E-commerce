-- PostgreSQL Functions Script for EgaPets
-- Converted from SQL Server Stored Procedures to PostgreSQL Functions

-- Connect to the database
\c egapets_db;

-- ─────────────────────────────────────────────────────────────────────────
-- Function: Insert FaceID
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION usp_insertFaceID(
    p_user_id INTEGER,
    p_face_vector BYTEA,
    p_pose VARCHAR(50) DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    -- Insert FaceID record
    INSERT INTO FaceID (user_id, face_vector, pose)
    VALUES (p_user_id, p_face_vector, p_pose);

    -- Log the enrollment action
    INSERT INTO FaceIDLogs (user_id, action, result)
    VALUES (p_user_id, 'enroll', 'success');
    
EXCEPTION
    WHEN OTHERS THEN
        -- Log failed enrollment
        INSERT INTO FaceIDLogs (user_id, action, result)
        VALUES (p_user_id, 'enroll', 'failed');
        RAISE;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────────────────────────────────
-- Function: Insert Product Image
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION usp_InsertProductImage(
    p_ma_san_pham VARCHAR(50),
    p_image_url TEXT,
    p_public_id VARCHAR(255),
    p_format VARCHAR(20),
    p_width INTEGER DEFAULT NULL,
    p_height INTEGER DEFAULT NULL,
    p_bytes INTEGER DEFAULT NULL,
    p_is_main BOOLEAN DEFAULT FALSE
) RETURNS VOID AS $$
DECLARE
    v_sp_id INTEGER;
BEGIN
    -- Get product ID
    SELECT id INTO v_sp_id
    FROM SanPham
    WHERE ma_san_pham = p_ma_san_pham;

    -- Check if product exists
    IF v_sp_id IS NULL THEN
        RAISE EXCEPTION 'Mã sản phẩm không tồn tại: %', p_ma_san_pham;
    END IF;

    -- If this is main image, set other images as non-main
    IF p_is_main = TRUE THEN
        UPDATE SanPhamAnh
        SET is_main = FALSE
        WHERE san_pham_id = v_sp_id
          AND is_main = TRUE;
    END IF;

    -- Insert new product image
    INSERT INTO SanPhamAnh (
        san_pham_id, image_url, public_id, format, 
        width, height, bytes, is_main
    )
    VALUES (
        v_sp_id, p_image_url, p_public_id, p_format,
        p_width, p_height, p_bytes, p_is_main
    );
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Lỗi khi thêm ảnh sản phẩm: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────────────────────────────────
-- Function: Update Customer Profile
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION usp_UpdateCustomerProfile(
    p_kh_id INTEGER,
    p_ho_ten VARCHAR(255) DEFAULT NULL,
    p_phone VARCHAR(15) DEFAULT NULL,
    p_dia_chi VARCHAR(255) DEFAULT NULL,
    p_tinh VARCHAR(100) DEFAULT NULL,
    p_huyen VARCHAR(100) DEFAULT NULL,
    p_xa VARCHAR(100) DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    -- Update customer profile with COALESCE to handle NULL values
    UPDATE KhachHang SET
        ho_ten = COALESCE(p_ho_ten, ho_ten),
        so_dien_thoai = COALESCE(p_phone, so_dien_thoai),
        dia_chi = COALESCE(p_dia_chi, dia_chi),
        tinh_thanh = COALESCE(p_tinh, tinh_thanh),
        quan_huyen = COALESCE(p_huyen, quan_huyen),
        phuong_xa = COALESCE(p_xa, phuong_xa),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_kh_id;

    -- Check if customer exists
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Khách hàng với ID % không tồn tại', p_kh_id;
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Lỗi khi cập nhật thông tin khách hàng: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────────────────────────────────
-- Additional Utility Functions
-- ─────────────────────────────────────────────────────────────────────────

-- Function: Get Product Details with Images
CREATE OR REPLACE FUNCTION get_product_details(p_ma_san_pham VARCHAR(50))
RETURNS TABLE(
    product_id INTEGER,
    ma_san_pham VARCHAR(50),
    ten_san_pham VARCHAR(255),
    thuong_hieu VARCHAR(100),
    gia_thanh DECIMAL(15,2),
    giam_gia DECIMAL(5,2),
    so_luong INTEGER,
    danh_muc VARCHAR(255),
    image_url TEXT,
    is_main_image BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sp.id,
        sp.ma_san_pham,
        sp.ten_san_pham,
        sp.thuong_hieu,
        sp.gia_thanh,
        sp.giam_gia,
        sp.so_luong,
        dm.ten_danh_muc,
        spa.image_url,
        spa.is_main
    FROM SanPham sp
    LEFT JOIN DanhMucSanPham dm ON sp.danh_muc_id = dm.id
    LEFT JOIN SanPhamAnh spa ON sp.id = spa.san_pham_id
    WHERE sp.ma_san_pham = p_ma_san_pham
    ORDER BY spa.is_main DESC, spa.id;
END;
$$ LANGUAGE plpgsql;

-- Function: Add to Cart
CREATE OR REPLACE FUNCTION add_to_cart(
    p_khach_hang_id INTEGER DEFAULT NULL,
    p_session_id VARCHAR(255) DEFAULT NULL,
    p_san_pham_id INTEGER,
    p_so_luong INTEGER DEFAULT 1
) RETURNS VOID AS $$
DECLARE
    v_existing_quantity INTEGER;
BEGIN
    -- Check if item already exists in cart
    SELECT so_luong INTO v_existing_quantity
    FROM GioHang
    WHERE (khach_hang_id = p_khach_hang_id OR (khach_hang_id IS NULL AND session_id = p_session_id))
      AND san_pham_id = p_san_pham_id;

    IF v_existing_quantity IS NOT NULL THEN
        -- Update existing cart item
        UPDATE GioHang
        SET so_luong = v_existing_quantity + p_so_luong,
            updated_at = CURRENT_TIMESTAMP
        WHERE (khach_hang_id = p_khach_hang_id OR (khach_hang_id IS NULL AND session_id = p_session_id))
          AND san_pham_id = p_san_pham_id;
    ELSE
        -- Insert new cart item
        INSERT INTO GioHang (khach_hang_id, session_id, san_pham_id, so_luong, is_guest)
        VALUES (
            p_khach_hang_id,
            p_session_id,
            p_san_pham_id,
            p_so_luong,
            CASE WHEN p_khach_hang_id IS NULL THEN TRUE ELSE FALSE END
        );
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Lỗi khi thêm sản phẩm vào giỏ hàng: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- Function: Create Order
CREATE OR REPLACE FUNCTION create_order(
    p_khach_hang_id INTEGER,
    p_phuong_thuc_thanh_toan_id INTEGER,
    p_dia_chi_giao_hang TEXT,
    p_ghi_chu TEXT DEFAULT NULL
) RETURNS INTEGER AS $$
DECLARE
    v_hoa_don_id INTEGER;
    v_tong_tien DECIMAL(15,2) := 0;
    cart_item RECORD;
BEGIN
    -- Create invoice
    INSERT INTO HoaDon (
        khach_hang_id, 
        phuong_thuc_thanh_toan_id, 
        dia_chi_giao_hang, 
        ghi_chu, 
        trang_thai
    )
    VALUES (
        p_khach_hang_id,
        p_phuong_thuc_thanh_toan_id,
        p_dia_chi_giao_hang,
        p_ghi_chu,
        'Chờ xử lý'
    )
    RETURNING id INTO v_hoa_don_id;

    -- Move cart items to order details
    FOR cart_item IN
        SELECT gh.san_pham_id, gh.so_luong, sp.gia_thanh, sp.giam_gia
        FROM GioHang gh
        JOIN SanPham sp ON gh.san_pham_id = sp.id
        WHERE gh.khach_hang_id = p_khach_hang_id
    LOOP
        INSERT INTO ChiTietHoaDon (
            hoa_don_id,
            san_pham_id,
            so_luong,
            gia_ban,
            giam_gia
        )
        VALUES (
            v_hoa_don_id,
            cart_item.san_pham_id,
            cart_item.so_luong,
            cart_item.gia_thanh,
            cart_item.giam_gia
        );
        
        -- Calculate total
        v_tong_tien := v_tong_tien + (cart_item.gia_thanh * cart_item.so_luong * (1 - cart_item.giam_gia / 100));
    END LOOP;

    -- Update invoice total
    UPDATE HoaDon
    SET tong_tien = v_tong_tien
    WHERE id = v_hoa_don_id;

    -- Clear cart
    DELETE FROM GioHang WHERE khach_hang_id = p_khach_hang_id;

    RETURN v_hoa_don_id;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Lỗi khi tạo đơn hàng: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- Function: Search Products
CREATE OR REPLACE FUNCTION search_products(
    p_search_term TEXT DEFAULT NULL,
    p_danh_muc_id INTEGER DEFAULT NULL,
    p_min_price DECIMAL(15,2) DEFAULT NULL,
    p_max_price DECIMAL(15,2) DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
    id INTEGER,
    ma_san_pham VARCHAR(50),
    ten_san_pham VARCHAR(255),
    thuong_hieu VARCHAR(100),
    gia_thanh DECIMAL(15,2),
    giam_gia DECIMAL(5,2),
    so_luong INTEGER,
    danh_gia DECIMAL(3,2),
    main_image_url TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sp.id,
        sp.ma_san_pham,
        sp.ten_san_pham,
        sp.thuong_hieu,
        sp.gia_thanh,
        sp.giam_gia,
        sp.so_luong,
        sp.danh_gia,
        spa.image_url
    FROM SanPham sp
    LEFT JOIN SanPhamAnh spa ON sp.id = spa.san_pham_id AND spa.is_main = TRUE
    WHERE 
        (p_search_term IS NULL OR 
         sp.ten_san_pham ILIKE '%' || p_search_term || '%' OR
         sp.thuong_hieu ILIKE '%' || p_search_term || '%' OR
         sp.thanh_phan ILIKE '%' || p_search_term || '%')
        AND (p_danh_muc_id IS NULL OR sp.danh_muc_id = p_danh_muc_id)
        AND (p_min_price IS NULL OR sp.gia_thanh >= p_min_price)
        AND (p_max_price IS NULL OR sp.gia_thanh <= p_max_price)
        AND sp.so_luong > 0
    ORDER BY sp.danh_gia DESC, sp.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

\echo 'PostgreSQL functions created successfully!';