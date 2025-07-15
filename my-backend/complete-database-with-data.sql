-- =====================================================
-- EgaPets Complete Database with Sample Data
-- PostgreSQL Database Schema and Data
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Users (Bảng chính cho tất cả người dùng)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username      VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20) NOT NULL CHECK (role IN ('Admin', 'NhanVien', 'KhachHang')),
    email         VARCHAR(100) NOT NULL UNIQUE,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP NULL,
    is_active     BOOLEAN NOT NULL DEFAULT TRUE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Nhân Viên (Liên kết với Users)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS NhanVien (
    id SERIAL PRIMARY KEY,
    user_id       INTEGER UNIQUE NOT NULL,
    ho_ten        VARCHAR(255) NOT NULL,
    so_dien_thoai VARCHAR(15) NOT NULL UNIQUE,
    ngay_sinh     DATE NULL,
    dia_chi       VARCHAR(255) NULL,
    luong_co_ban  DECIMAL(18,2) NULL CHECK (luong_co_ban >= 0),
    ngay_bat_dau  DATE NOT NULL DEFAULT CURRENT_DATE,
    trang_thai    VARCHAR(20) NOT NULL DEFAULT 'Đang làm việc'
        CHECK (trang_thai IN ('Đang làm việc', 'Nghỉ phép', 'Đã nghỉ việc')),

    CONSTRAINT FK_NhanVien_Users 
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Khách Hàng (Liên kết với Users)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS KhachHang (
    id SERIAL PRIMARY KEY,
    user_id       INTEGER UNIQUE NOT NULL,
    ho_ten        VARCHAR(255) NOT NULL,
    so_dien_thoai VARCHAR(15) NOT NULL UNIQUE,
    ngay_sinh     DATE NULL,
    dia_chi       VARCHAR(255) NULL,
    diem_tich_luy INTEGER NOT NULL DEFAULT 0 CHECK (diem_tich_luy >= 0),
    ngay_dang_ky  DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT FK_KhachHang_Users 
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Danh Mục Sản Phẩm (Original)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS DanhMucSanPham (
    id SERIAL PRIMARY KEY,
    ten_danh_muc VARCHAR(255) NOT NULL UNIQUE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Danh Mục Sản Phẩm (New naming convention)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS danh_muc_san_pham (
    id SERIAL PRIMARY KEY,
    ten_danh_muc VARCHAR(255) NOT NULL UNIQUE,
    mo_ta TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Sản Phẩm (Original)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS SanPham (
    id SERIAL PRIMARY KEY,
    ma_san_pham   VARCHAR(50) NOT NULL UNIQUE,
    ten_san_pham  VARCHAR(255) NOT NULL,
    thuong_hieu   VARCHAR(100) NULL,
    loai          VARCHAR(100) NULL,
    gia_thanh     DECIMAL(18,2) NOT NULL CHECK (gia_thanh >= 0),
    so_luong      INTEGER NOT NULL DEFAULT 0 CHECK (so_luong >= 0),
    danh_muc_id   INTEGER NOT NULL,
    img_url       VARCHAR(500) NULL,
    ngay_tao      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat TIMESTAMP NULL,

    CONSTRAINT FK_SanPham_DanhMuc 
        FOREIGN KEY (danh_muc_id) REFERENCES DanhMucSanPham(id) ON DELETE RESTRICT
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Sản Phẩm (New naming convention)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS san_pham (
    id SERIAL PRIMARY KEY,
    ten_san_pham VARCHAR(255) NOT NULL,
    mo_ta TEXT NULL,
    gia DECIMAL(18,2) NOT NULL CHECK (gia >= 0),
    so_luong_ton_kho INTEGER NOT NULL DEFAULT 0 CHECK (so_luong_ton_kho >= 0),
    danh_muc_id INTEGER NOT NULL,
    hinh_anh_url VARCHAR(500) NULL,
    trang_thai VARCHAR(20) DEFAULT 'active' CHECK (trang_thai IN ('active', 'inactive', 'out_of_stock')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT san_pham_danh_muc_id_fkey 
        FOREIGN KEY (danh_muc_id) REFERENCES danh_muc_san_pham(id) ON DELETE RESTRICT
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Giỏ Hàng
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS GioHang (
    id SERIAL PRIMARY KEY,
    khach_hang_id INTEGER NULL,
    san_pham_id   INTEGER NOT NULL,
    so_luong      INTEGER CHECK (so_luong > 0),
    gia           DECIMAL(18,2) CHECK (gia > 0),
    session_id    VARCHAR(255) NULL,
    ngay_them     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_GioHang_KhachHang 
        FOREIGN KEY (khach_hang_id) REFERENCES KhachHang(id) ON DELETE CASCADE,
    CONSTRAINT FK_GioHang_SanPham 
        FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Phương Thức Thanh Toán
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS PhuongThucThanhToan (
    id SERIAL PRIMARY KEY,
    ten_phuong_thuc VARCHAR(50) NOT NULL UNIQUE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Dịch Vụ
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS DichVu (
    id SERIAL PRIMARY KEY,
    ten_dich_vu   VARCHAR(255) NOT NULL,
    mo_ta         TEXT NULL,
    gia_mac_dinh  DECIMAL(18,2) NOT NULL CHECK (gia_mac_dinh >= 0)
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Chi Tiết Dịch Vụ (Phân loại giá theo cân nặng & loại lông)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS DichVuChiTiet (
    id SERIAL PRIMARY KEY,
    dich_vu_id INTEGER NOT NULL,
    can_nang   VARCHAR(10) NOT NULL 
        CHECK (can_nang IN ('<3kg', '3-5kg', '5-10kg', '10-20kg', '>20kg')),
    loai_long  VARCHAR(10) NOT NULL 
        CHECK (loai_long IN ('Ngắn', 'Dài')),
    gia        DECIMAL(18,2) NOT NULL CHECK (gia >= 0),

    CONSTRAINT FK_DichVuChiTiet_DichVu 
        FOREIGN KEY (dich_vu_id) REFERENCES DichVu(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Lịch Hẹn
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS LichHen (
    id SERIAL PRIMARY KEY,
    khach_hang_id       INTEGER NOT NULL,
    nhan_vien_id        INTEGER NULL,
    dich_vu_id          INTEGER NOT NULL,
    dich_vu_chi_tiet_id INTEGER NOT NULL,
    ngay_hen            TIMESTAMP NOT NULL,
    trang_thai          VARCHAR(50) NOT NULL DEFAULT 'Chờ xác nhận'
        CHECK (trang_thai IN ('Chờ xác nhận', 'Đã xác nhận', 'Hoàn thành', 'Hủy')),
    ghi_chu             TEXT NULL,

    CONSTRAINT FK_LichHen_KhachHang 
        FOREIGN KEY (khach_hang_id) REFERENCES KhachHang(id) ON DELETE CASCADE,
    CONSTRAINT FK_LichHen_NhanVien
        FOREIGN KEY (nhan_vien_id) REFERENCES NhanVien(id) ON DELETE SET NULL,
    CONSTRAINT FK_LichHen_DichVu
        FOREIGN KEY (dich_vu_id) REFERENCES DichVu(id) ON DELETE RESTRICT,
    CONSTRAINT FK_LichHen_DichVuChiTiet
        FOREIGN KEY (dich_vu_chi_tiet_id) REFERENCES DichVuChiTiet(id) ON DELETE RESTRICT
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Hóa Đơn (Liên kết Khách Hàng, Nhân Viên, Phương Thức)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS HoaDon (
    id SERIAL PRIMARY KEY,
    khach_hang_id    INTEGER NOT NULL,
    nhan_vien_id     INTEGER NULL,
    ngay_dat         DATE NOT NULL DEFAULT CURRENT_DATE,
    giam_gia_hoa_don DECIMAL(5,2) CHECK (giam_gia_hoa_don >= 0 AND giam_gia_hoa_don <= 100),
    tong_tien        DECIMAL(18,2) CHECK (tong_tien >= 0),
    trang_thai       VARCHAR(50) NOT NULL DEFAULT 'Chờ xác nhận',
    phuong_thuc_id   INTEGER NOT NULL,
    ma_don_hang      VARCHAR(20) NOT NULL UNIQUE 
        DEFAULT CONCAT('DH', TO_CHAR(CURRENT_DATE, 'YYYYMMDD'), SUBSTRING(uuid_generate_v4()::text, 1, 6)),
    ghi_chu          TEXT NULL,
    lich_hen_id      INTEGER NULL,

    CONSTRAINT FK_HoaDon_KhachHang 
        FOREIGN KEY (khach_hang_id) REFERENCES KhachHang(id) ON DELETE RESTRICT,
    CONSTRAINT FK_HoaDon_NhanVien 
        FOREIGN KEY (nhan_vien_id) REFERENCES NhanVien(id) ON DELETE SET NULL,
    CONSTRAINT FK_HoaDon_PhuongThuc 
        FOREIGN KEY (phuong_thuc_id) REFERENCES PhuongThucThanhToan(id) ON DELETE RESTRICT,
    CONSTRAINT FK_HoaDon_LichHen 
        FOREIGN KEY (lich_hen_id) REFERENCES LichHen(id) ON DELETE SET NULL
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Chi Tiết Hóa Đơn
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ChiTietHoaDon (
    id SERIAL PRIMARY KEY,
    hoa_don_id         INTEGER NOT NULL,
    san_pham_id        INTEGER NOT NULL,
    so_luong           INTEGER CHECK (so_luong > 0),
    gia                DECIMAL(18,2) CHECK (gia > 0),
    giam_gia_san_pham  DECIMAL(5,2) CHECK (giam_gia_san_pham >= 0 AND giam_gia_san_pham <= 100),
    thanh_tien         DECIMAL(18,2) GENERATED ALWAYS AS ((so_luong * gia) * (1 - giam_gia_san_pham/100)) STORED,

    CONSTRAINT FK_HoaDon 
        FOREIGN KEY (hoa_don_id) REFERENCES HoaDon(id) ON DELETE CASCADE,
    CONSTRAINT FK_SanPham 
        FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Lịch Sử Sản Phẩm
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS LichSuSanPham (
    id SERIAL PRIMARY KEY,
    san_pham_id       INTEGER NULL,
    hanh_dong         VARCHAR(50) NOT NULL, 
    thoi_gian         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nhan_vien_login   VARCHAR(255) NOT NULL, 
    noi_dung_thay_doi TEXT NULL,

    CONSTRAINT FK_LichSuSanPham
        FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE SET NULL
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Chi Tiết Thanh Toán
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ChiTietThanhToan (
    id SERIAL PRIMARY KEY,
    hoa_don_id      INTEGER NOT NULL,
    phuong_thuc_id  INTEGER NOT NULL,
    ma_giao_dich    VARCHAR(100) NULL, 
    qr_code         TEXT NULL, 
    trang_thai      VARCHAR(50) NOT NULL DEFAULT 'Chờ thanh toán',
    ngay_thanh_toan TIMESTAMP NULL,

    CONSTRAINT FK_ChiTietThanhToan_HoaDon 
        FOREIGN KEY (hoa_don_id) REFERENCES HoaDon(id) ON DELETE CASCADE,
    CONSTRAINT FK_ChiTietThanhToan_PhuongThuc 
        FOREIGN KEY (phuong_thuc_id) REFERENCES PhuongThucThanhToan(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE FaceID
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS FaceID (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    face_vector BYTEA NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    pose VARCHAR(50) NULL,

    CONSTRAINT FK_FaceID_Users
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE FaceIDLogs
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS FaceIDLogs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'enroll' / 'verify' / 'failed'
    ip_address VARCHAR(100) NULL,
    device_info VARCHAR(255) NULL,
    result VARCHAR(50) NOT NULL, -- 'success' / 'fail'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    distance REAL NULL,

    CONSTRAINT FK_FaceIDLogs_Users
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- =====================================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================
DO $$ 
BEGIN
    -- Check and create indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_email') THEN
        CREATE INDEX idx_users_email ON Users(email);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_username') THEN
        CREATE INDEX idx_users_username ON Users(username);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sanpham_ma') THEN
        CREATE INDEX idx_sanpham_ma ON SanPham(ma_san_pham);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_hoadon_khachhang') THEN
        CREATE INDEX idx_hoadon_khachhang ON HoaDon(khach_hang_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_hoadon_ngaydat') THEN
        CREATE INDEX idx_hoadon_ngaydat ON HoaDon(ngay_dat);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_lichhen_ngayhen') THEN
        CREATE INDEX idx_lichhen_ngayhen ON LichHen(ngay_hen);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_giohang_session') THEN
        CREATE INDEX idx_giohang_session ON GioHang(session_id);
    END IF;
END $$;

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Insert sample users
INSERT INTO Users(username, password_hash, role, email) VALUES 
('admin', digest('admin123', 'sha256'), 'Admin', 'admin@egapets.com'),
('nhanvien1', digest('nv123456', 'sha256'), 'NhanVien', 'nhanvien1@egapets.com'),
('demo1', digest('123456', 'sha256'), 'KhachHang', 'demo@egapets1.local')
ON CONFLICT (username) DO NOTHING;

-- Insert sample customer
INSERT INTO KhachHang(user_id, ho_ten, so_dien_thoai)
SELECT id, 'Khách demo1', '123123123123'
FROM Users WHERE username = 'demo1'
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample employee
INSERT INTO NhanVien(user_id, ho_ten, so_dien_thoai, luong_co_ban)
SELECT id, 'Nhân viên 1', '987654321', 8000000
FROM Users WHERE username = 'nhanvien1'
ON CONFLICT (user_id) DO NOTHING;

-- Insert payment methods
INSERT INTO PhuongThucThanhToan (ten_phuong_thuc) VALUES 
('Tiền mặt'),
('Chuyển khoản'),
('Thẻ tín dụng'),
('Ví điện tử')
ON CONFLICT (ten_phuong_thuc) DO NOTHING;

-- Insert categories for DanhMucSanPham
INSERT INTO DanhMucSanPham (ten_danh_muc) VALUES 
('Thức ăn cho chó'),
('Thức ăn cho mèo'),
('Đồ chơi thú cưng'),
('Phụ kiện thú cưng'),
('Thuốc và vitamin'),
('Vệ sinh thú cưng')
ON CONFLICT (ten_danh_muc) DO NOTHING;

-- Insert categories for danh_muc_san_pham
INSERT INTO danh_muc_san_pham (ten_danh_muc, mo_ta) VALUES 
('Thức ăn cho chó', 'Các loại thức ăn dinh dưỡng cho chó'),
('Thức ăn cho mèo', 'Các loại thức ăn dinh dưỡng cho mèo'),
('Đồ chơi thú cưng', 'Đồ chơi giải trí cho thú cưng'),
('Phụ kiện thú cưng', 'Các phụ kiện cần thiết cho thú cưng'),
('Thuốc và vitamin', 'Thuốc và vitamin bổ sung cho thú cưng'),
('Vệ sinh thú cưng', 'Sản phẩm vệ sinh cho thú cưng')
ON CONFLICT (ten_danh_muc) DO NOTHING;

-- Insert sample products for SanPham table
DO $$
DECLARE
    cat_cho_id INTEGER;
    cat_meo_id INTEGER;
    cat_toy_id INTEGER;
BEGIN
    -- Get category IDs from DanhMucSanPham
    SELECT id INTO cat_cho_id FROM DanhMucSanPham WHERE ten_danh_muc = 'Thức ăn cho chó';
    SELECT id INTO cat_meo_id FROM DanhMucSanPham WHERE ten_danh_muc = 'Thức ăn cho mèo';
    SELECT id INTO cat_toy_id FROM DanhMucSanPham WHERE ten_danh_muc = 'Đồ chơi thú cưng';
    
    -- Insert products
    INSERT INTO SanPham (ma_san_pham, ten_san_pham, thuong_hieu, loai, gia_thanh, so_luong, danh_muc_id, img_url) VALUES 
    ('RC001', 'Royal Canin Adult', 'Royal Canin', 'Thức ăn khô', 450000, 50, cat_cho_id, '/images/royal-canin-adult.jpg'),
    ('WH001', 'Whiskas Adult', 'Whiskas', 'Thức ăn ướt', 85000, 100, cat_meo_id, '/images/whiskas-adult.jpg'),
    ('PD001', 'Pedigree Puppy', 'Pedigree', 'Thức ăn khô', 320000, 30, cat_cho_id, '/images/pedigree-puppy.jpg'),
    ('ME001', 'Me-O Kitten', 'Me-O', 'Thức ăn khô', 75000, 80, cat_meo_id, '/images/me-o-kitten.jpg'),
    ('PT001', 'Bóng tennis cho chó', 'Pet Toy', 'Đồ chơi', 25000, 200, cat_toy_id, '/images/tennis-ball.jpg')
    ON CONFLICT (ma_san_pham) DO NOTHING;
END $$;

-- Insert sample products for san_pham table
DO $$
DECLARE
    cat_cho_id INTEGER;
    cat_meo_id INTEGER;
    cat_toy_id INTEGER;
BEGIN
    -- Get category IDs from danh_muc_san_pham
    SELECT id INTO cat_cho_id FROM danh_muc_san_pham WHERE ten_danh_muc = 'Thức ăn cho chó';
    SELECT id INTO cat_meo_id FROM danh_muc_san_pham WHERE ten_danh_muc = 'Thức ăn cho mèo';
    SELECT id INTO cat_toy_id FROM danh_muc_san_pham WHERE ten_danh_muc = 'Đồ chơi thú cưng';
    
    -- Insert products
    INSERT INTO san_pham (ten_san_pham, mo_ta, gia, so_luong_ton_kho, danh_muc_id, hinh_anh_url, trang_thai) VALUES 
    ('Hill''s Science Diet', 'Thức ăn dinh dưỡng cao cấp cho chó', 520000, 40, cat_cho_id, '/images/hills-science.jpg', 'active'),
    ('Purina Pro Plan', 'Thức ăn chuyên nghiệp cho mèo', 380000, 60, cat_meo_id, '/images/purina-pro.jpg', 'active'),
    ('Acana Heritage', 'Thức ăn tự nhiên cho chó', 680000, 25, cat_cho_id, '/images/acana-heritage.jpg', 'active'),
    ('Orijen Cat Food', 'Thức ăn cao cấp cho mèo', 750000, 35, cat_meo_id, '/images/orijen-cat.jpg', 'active'),
    ('Kong Classic', 'Đồ chơi cao su bền chắc', 45000, 80, cat_toy_id, '/images/kong-classic.jpg', 'active'),
    ('Royal Canin Digestive Care', 'Thức ăn hỗ trợ tiêu hóa cho chó', 480000, 35, cat_cho_id, '/images/rc-digestive.jpg', 'active'),
    ('Whiskas Kitten', 'Thức ăn cho mèo con', 95000, 70, cat_meo_id, '/images/whiskas-kitten.jpg', 'active'),
    ('Friskies Indoor', 'Thức ăn cho mèo nhà', 65000, 90, cat_meo_id, '/images/friskies-indoor.jpg', 'active');
END $$;

-- Insert services
INSERT INTO DichVu (ten_dich_vu, mo_ta, gia_mac_dinh) VALUES 
('Tắm rửa cơ bản', 'Dịch vụ tắm rửa cơ bản cho thú cưng', 100000),
('Cắt tỉa lông', 'Dịch vụ cắt tỉa lông chuyên nghiệp', 150000),
('Khám sức khỏe tổng quát', 'Khám sức khỏe định kỳ cho thú cưng', 200000),
('Tiêm phòng', 'Dịch vụ tiêm phòng đầy đủ', 300000),
('Spa thú cưng', 'Dịch vụ spa cao cấp', 500000)
ON CONFLICT DO NOTHING;

-- Insert service details
DO $$
DECLARE
    tam_rua_id INTEGER;
    cat_tia_id INTEGER;
BEGIN
    -- Get service IDs
    SELECT id INTO tam_rua_id FROM DichVu WHERE ten_dich_vu = 'Tắm rửa cơ bản';
    SELECT id INTO cat_tia_id FROM DichVu WHERE ten_dich_vu = 'Cắt tỉa lông';
    
    -- Insert service details
    INSERT INTO DichVuChiTiet (dich_vu_id, can_nang, loai_long, gia) VALUES 
    (tam_rua_id, '<3kg', 'Ngắn', 80000),
    (tam_rua_id, '<3kg', 'Dài', 100000),
    (tam_rua_id, '3-5kg', 'Ngắn', 100000),
    (tam_rua_id, '3-5kg', 'Dài', 120000),
    (tam_rua_id, '5-10kg', 'Ngắn', 120000),
    (tam_rua_id, '5-10kg', 'Dài', 150000),
    (tam_rua_id, '10-20kg', 'Ngắn', 180000),
    (tam_rua_id, '10-20kg', 'Dài', 220000),
    (tam_rua_id, '>20kg', 'Ngắn', 250000),
    (tam_rua_id, '>20kg', 'Dài', 300000),
    (cat_tia_id, '<3kg', 'Ngắn', 120000),
    (cat_tia_id, '<3kg', 'Dài', 150000),
    (cat_tia_id, '3-5kg', 'Ngắn', 150000),
    (cat_tia_id, '3-5kg', 'Dài', 180000),
    (cat_tia_id, '5-10kg', 'Ngắn', 180000),
    (cat_tia_id, '5-10kg', 'Dài', 220000),
    (cat_tia_id, '10-20kg', 'Ngắn', 250000),
    (cat_tia_id, '10-20kg', 'Dài', 300000),
    (cat_tia_id, '>20kg', 'Ngắn', 350000),
    (cat_tia_id, '>20kg', 'Dài', 400000);
END $$;

-- =====================================================
-- FINAL MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '✅ EgaPets database setup completed successfully!';
    RAISE NOTICE '📊 Database includes:';
    RAISE NOTICE '   - Complete table structure with constraints';
    RAISE NOTICE '   - Sample users (admin, employee, customer)';
    RAISE NOTICE '   - Product categories and sample products';
    RAISE NOTICE '   - Services with detailed pricing';
    RAISE NOTICE '   - Payment methods';
    RAISE NOTICE '   - Proper indexes for performance';
END $$;