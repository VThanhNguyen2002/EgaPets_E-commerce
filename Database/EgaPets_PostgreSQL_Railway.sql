-- PostgreSQL Database Script for EgaPets - Railway Version
-- Only creates tables, no database creation

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Users (Quản lý tất cả tài khoản)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username         VARCHAR(255) UNIQUE NOT NULL,
    password_hash    BYTEA NOT NULL, -- Mã hóa SHA256
    role             VARCHAR(50) NOT NULL 
        CHECK (role IN ('Admin', 'NhanVien', 'KhachHang')),
    email            VARCHAR(255) UNIQUE NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE PasswordResets
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS PasswordResets (
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    reset_token   VARCHAR(100) NOT NULL UNIQUE,
    expires_at    TIMESTAMP NOT NULL
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE EmailOtp – lưu mã OTP dùng một lần
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS EmailOtp (
    id           SERIAL PRIMARY KEY,
    user_id      INTEGER NOT NULL
                 REFERENCES Users(id) ON DELETE CASCADE,
    code         VARCHAR(6) NOT NULL,          -- 6 ký tự 0‑9
    purpose      VARCHAR(30) NOT NULL,         -- 'resetPw' | 'verifyEmail' ...
    expires_at   TIMESTAMP NOT NULL,
    used_at      TIMESTAMP NULL,

    CONSTRAINT UQ_EmailOtp UNIQUE (user_id, purpose) -- mỗi mục đích 1 mã còn hiệu lực
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
    ngay_vao_lam  DATE NOT NULL DEFAULT CURRENT_DATE,
    chuc_vu       VARCHAR(100) NOT NULL 
        CHECK (chuc_vu IN ('Nhân viên bán hàng', 'Quản lý kho', 'Admin')),
    luong         DECIMAL(18,2) CHECK (luong >= 0),
    CONSTRAINT FK_NhanVien_Users 
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE RESTRICT
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
    tinh_thanh    VARCHAR(100) NULL,
    quan_huyen    VARCHAR(100) NULL,
    phuong_xa     VARCHAR(100) NULL,
    CONSTRAINT FK_KhachHang_Users 
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Danh mục sản phẩm
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS DanhMucSanPham (
    id SERIAL PRIMARY KEY,
    ten_danh_muc VARCHAR(255) NOT NULL UNIQUE
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Sản Phẩm
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS SanPham (
    id SERIAL PRIMARY KEY,
    ma_san_pham VARCHAR(50) NOT NULL UNIQUE,
    ten_san_pham VARCHAR(255) NOT NULL,
    thuong_hieu  VARCHAR(100) NULL,
    so_gram      INTEGER CHECK (so_gram > 0),
    loai         VARCHAR(100) NOT NULL, 
    nguon_goc    VARCHAR(100) NULL,
    han_su_dung  DATE NULL,
    so_luong     INTEGER CHECK (so_luong >= 0),
    gia_thanh    DECIMAL(18,2) CHECK (gia_thanh > 0),
    giam_gia     DECIMAL(5,2) CHECK (giam_gia >= 0 AND giam_gia <= 100),
    danh_gia     REAL CHECK (danh_gia >= 0 AND danh_gia <= 5),
    thanh_phan   TEXT NULL,
    created_at   DATE NOT NULL DEFAULT CURRENT_DATE,
    img_url      TEXT NULL,
    updated_at   TIMESTAMP NULL,
    updated_by   VARCHAR(255) NULL,
    danh_muc_id  INTEGER NULL,
    CONSTRAINT FK_SanPham_DanhMuc
        FOREIGN KEY (danh_muc_id) REFERENCES DanhMucSanPham(id) ON DELETE SET NULL
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Ảnh Sản Phẩm – Cloudinary
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS SanPhamAnh (
    id            SERIAL PRIMARY KEY,     -- khoá chính
    san_pham_id   INTEGER NOT NULL,       -- FK ⇒ SanPham.id
    image_url     TEXT NOT NULL,          -- URL đầy đủ https://res.cloudinary.com/...
    public_id     VARCHAR(255) NOT NULL,  -- egapets/products/P001/abc123
    format        VARCHAR(20) NULL,       -- jpg / png / webp ...
    width         INTEGER NULL,
    height        INTEGER NULL,
    bytes         INTEGER NULL,           -- kích thước file
    is_main       BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE = ảnh đại diện
    uploaded_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_SanPhamAnh_SanPham
        FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE
);

-- Create unique index for main image (only if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'uq_sanphamanh_main') THEN
        CREATE UNIQUE INDEX UQ_SanPhamAnh_Main
        ON SanPhamAnh(san_pham_id)
        WHERE is_main = TRUE;
    END IF;
END $$;

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Danh Sách Yêu Thích của Khách Hàng tới Sản Phẩm đó
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS DanhSachYeuThich (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    san_pham_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_YeuThich_Users FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT FK_YeuThich_SanPham FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE,
    CONSTRAINT UQ_User_Product UNIQUE (user_id, san_pham_id)  -- không được yêu thích trùng
);

-- ─────────────────────────────────────────────────────────────────────────
-- TABLE Giỏ Hàng (Liên kết với Khách Hàng & Sản Phẩm)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS GioHang (
    id SERIAL PRIMARY KEY,
    khach_hang_id INTEGER NULL,
    san_pham_id   INTEGER NOT NULL,
    so_luong      INTEGER CHECK (so_luong > 0),
    gia           DECIMAL(18,2) CHECK (gia > 0),
    giam_gia      DECIMAL(5,2) CHECK (giam_gia >= 0 AND giam_gia <= 100),
    session_id    VARCHAR(255) NULL,
    is_guest      BOOLEAN DEFAULT FALSE,
    updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- Create indexes for better performance (only if not exists)
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

-- Insert sample data only if not exists
DO $$ 
BEGIN
    -- Insert sample user if not exists
    IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'demo1') THEN
        INSERT INTO Users(username, password_hash, role, email)
        VALUES (
          'demo1',
          digest('123456', 'sha256'),  -- mật khẩu thật là: 123456
          'KhachHang',
          'demo@egapets1.local'
        );
        
        -- Insert customer data
        INSERT INTO KhachHang(user_id, ho_ten, so_dien_thoai)
        SELECT id, 'Khách demo1', '123123123123'
        FROM Users WHERE username = 'demo1';
    END IF;
    
    -- Insert payment methods if not exists
    IF NOT EXISTS (SELECT 1 FROM PhuongThucThanhToan WHERE ten_phuong_thuc = 'Tiền mặt') THEN
        INSERT INTO PhuongThucThanhToan(ten_phuong_thuc) VALUES 
        ('Tiền mặt'),
        ('Chuyển khoản'),
        ('Thẻ tín dụng'),
        ('Ví điện tử');
    END IF;
END $$;

-- Comments for documentation
COMMENT ON TABLE Users IS 'Bảng quản lý tất cả tài khoản người dùng';
COMMENT ON TABLE SanPham IS 'Bảng quản lý sản phẩm thú cưng';
COMMENT ON TABLE HoaDon IS 'Bảng quản lý hóa đơn bán hàng';
COMMENT ON TABLE LichHen IS 'Bảng quản lý lịch hẹn dịch vụ';

-- End of Railway PostgreSQL script