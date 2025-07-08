-- PostgreSQL Triggers Script for EgaPets
-- Converted from SQL Server Triggers to PostgreSQL Triggers

-- Connect to the database
\c egapets_db;

-- ─────────────────────────────────────────────────────────────────────────
-- Trigger: Log FaceID Updates
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION trg_update_faceid_logs()
RETURNS TRIGGER AS $$
BEGIN
    -- Only log if face_vector has changed
    IF OLD.face_vector IS DISTINCT FROM NEW.face_vector THEN
        INSERT INTO FaceIDLogs (user_id, action, result, ip_address, device_info)
        VALUES (
            NEW.user_id,
            'update-embedding',
            'success',
            'SYSTEM_TRIGGER',
            'DB_TRIGGER'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_faceid_logs
AFTER UPDATE ON FaceID
FOR EACH ROW
EXECUTE FUNCTION trg_update_faceid_logs();

-- ─────────────────────────────────────────────────────────────────────────
-- Trigger: Track Product Changes (Insert/Update)
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION trg_sanpham_insertupdate()
RETURNS TRIGGER AS $$
BEGIN
    -- For both INSERT and UPDATE operations
    INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
    VALUES (
        NEW.id,
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'Thêm'
            ELSE 'Sửa'
        END,
        CURRENT_USER,
        CASE
            WHEN TG_OP = 'INSERT' THEN 'Thêm mới sản phẩm'
            ELSE CONCAT(
                'Tên: ', OLD.ten_san_pham, ' ➜ ', NEW.ten_san_pham, '; ',
                'Giá: ', OLD.gia_thanh, ' ➜ ', NEW.gia_thanh
            )
        END
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sanpham_insertupdate
AFTER INSERT OR UPDATE ON SanPham
FOR EACH ROW
EXECUTE FUNCTION trg_sanpham_insertupdate();

-- ─────────────────────────────────────────────────────────────────────────
-- Trigger: Track Product Deletions
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION trg_sanpham_delete()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
    VALUES (
        OLD.id,
        'Xóa',
        CURRENT_USER,
        'Đã xóa sản phẩm'
    );
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sanpham_delete
AFTER DELETE ON SanPham
FOR EACH ROW
EXECUTE FUNCTION trg_sanpham_delete();

-- ─────────────────────────────────────────────────────────────────────────
-- Trigger: Create User Profiles After User Creation
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION trg_user_afterinsert()
RETURNS TRIGGER AS $$
BEGIN
    -- Create customer profile for customer users
    IF NEW.role = 'KhachHang' THEN
        INSERT INTO KhachHang (user_id, ho_ten, so_dien_thoai)
        VALUES (NEW.id, NEW.username, '');
    END IF;
    
    -- Create employee profile for employee users
    IF NEW.role = 'NhanVien' THEN
        INSERT INTO NhanVien (user_id, ho_ten, so_dien_thoai, chuc_vu, luong)
        VALUES (NEW.id, NEW.username, '', 'Nhân viên bán hàng', NULL);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_afterinsert
AFTER INSERT ON Users
FOR EACH ROW
EXECUTE FUNCTION trg_user_afterinsert();

-- ─────────────────────────────────────────────────────────────────────────
-- Trigger: Update Cart Timestamp
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION trg_giohang_touch()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the timestamp when cart is modified
    NEW.updated_at = CURRENT_TIMESTAMP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_giohang_touch
BEFORE UPDATE ON GioHang
FOR EACH ROW
EXECUTE FUNCTION trg_giohang_touch();

-- ─────────────────────────────────────────────────────────────────────────
-- Additional Triggers for Data Integrity
-- ─────────────────────────────────────────────────────────────────────────

-- Trigger: Update Product Quantity After Order
CREATE OR REPLACE FUNCTION trg_update_product_quantity()
RETURNS TRIGGER AS $$
BEGIN
    -- Decrease product quantity when order is placed
    UPDATE SanPham
    SET so_luong = so_luong - NEW.so_luong
    WHERE id = NEW.san_pham_id;
    
    -- Log the product quantity change
    INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
    VALUES (
        NEW.san_pham_id,
        'Bán',
        CURRENT_USER,
        CONCAT('Đã bán ', NEW.so_luong, ' sản phẩm qua đơn hàng #', NEW.hoa_don_id)
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_product_quantity
AFTER INSERT ON ChiTietHoaDon
FOR EACH ROW
EXECUTE FUNCTION trg_update_product_quantity();

-- Trigger: Prevent Negative Product Quantity
CREATE OR REPLACE FUNCTION trg_prevent_negative_quantity()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if there's enough stock
    IF NEW.so_luong > (SELECT so_luong FROM SanPham WHERE id = NEW.san_pham_id) THEN
        RAISE EXCEPTION 'Không đủ số lượng sản phẩm trong kho';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_negative_quantity
BEFORE INSERT OR UPDATE ON ChiTietHoaDon
FOR EACH ROW
EXECUTE FUNCTION trg_prevent_negative_quantity();

-- Trigger: Update Order Total When Order Details Change
CREATE OR REPLACE FUNCTION trg_update_order_total()
RETURNS TRIGGER AS $$
DECLARE
    v_total DECIMAL(15,2);
BEGIN
    -- Calculate new total
    SELECT COALESCE(SUM(gia_ban * so_luong * (1 - giam_gia/100)), 0)
    INTO v_total
    FROM ChiTietHoaDon
    WHERE hoa_don_id = NEW.hoa_don_id;
    
    -- Update order total
    UPDATE HoaDon
    SET tong_tien = v_total
    WHERE id = NEW.hoa_don_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_order_total
AFTER INSERT OR UPDATE OR DELETE ON ChiTietHoaDon
FOR EACH ROW
EXECUTE FUNCTION trg_update_order_total();

-- ─────────────────────────────────────────────────────────────────────────
-- List All Triggers
-- ─────────────────────────────────────────────────────────────────────────
\echo 'Listing all triggers in the database:'

SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

\echo 'PostgreSQL triggers created successfully!';