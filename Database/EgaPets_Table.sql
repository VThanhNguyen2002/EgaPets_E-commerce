﻿USE master;
GO

-- 1. Xóa database cũ (nếu tồn tại) và tạo mới
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'EgaPets_DB')
BEGIN
    ALTER DATABASE EgaPets_DB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE EgaPets_DB;
END
GO

CREATE DATABASE EgaPets_DB;

USE EgaPets_DB;
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Users (Quản lý tất cả tài khoản)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username         NVARCHAR(255) UNIQUE NOT NULL,
    password_hash    VARBINARY(64) NOT NULL, -- Mã hóa SHA2_256
    role             NVARCHAR(50) NOT NULL 
        CHECK (role IN (N'Admin', N'NhanVien', N'KhachHang')),
    email            NVARCHAR(255) UNIQUE NOT NULL,
    created_at       DATETIME DEFAULT GETDATE()
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG PasswordResets
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE PasswordResets (
    id            INT IDENTITY(1,1) PRIMARY KEY,
    user_id       INT           NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    reset_token   NVARCHAR(100) NOT NULL UNIQUE,
    expires_at    DATETIME      NOT NULL
);
GO

/* ─────────────────────────────────────────────
   BẢNG EmailOtp – lưu mã OTP dùng một lần
   ───────────────────────────────────────────── */
CREATE TABLE EmailOtp (
    id           INT IDENTITY(1,1) PRIMARY KEY,
    user_id      INT           NOT NULL
                 REFERENCES Users(id) ON DELETE CASCADE,
    code         NVARCHAR(6)   NOT NULL,          -- 6 ký tự 0‑9
    purpose      NVARCHAR(30)  NOT NULL,          -- 'resetPw' | 'verifyEmail' ...
    expires_at   DATETIME      NOT NULL,
    used_at      DATETIME      NULL,

    CONSTRAINT UQ_EmailOtp UNIQUE (user_id, purpose) -- mỗi mục đích 1 mã còn hiệu lực
);
GO


-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Nhân Viên (Liên kết với Users)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE NhanVien (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id       INT UNIQUE NOT NULL,
    ho_ten        NVARCHAR(255) NOT NULL,
    so_dien_thoai NVARCHAR(15)  NOT NULL UNIQUE,
    ngay_sinh     DATE          NULL,
    dia_chi       NVARCHAR(255) NULL,
    ngay_vao_lam  DATE          NOT NULL DEFAULT GETDATE(),
    chuc_vu       NVARCHAR(100) NOT NULL 
        CHECK (chuc_vu IN (N'Nhân viên bán hàng', N'Quản lý kho', N'Admin')),
    luong         DECIMAL(18,2) CHECK (luong >= 0),
    CONSTRAINT FK_NhanVien_Users 
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE NO ACTION
);
GO


-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Khách Hàng (Liên kết với Users)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE KhachHang (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id       INT UNIQUE NOT NULL,
    ho_ten        NVARCHAR(255) NOT NULL,
    so_dien_thoai NVARCHAR(15)  NOT NULL UNIQUE,
    ngay_sinh     DATE          NULL,
    dia_chi       NVARCHAR(255) NULL,
    tinh_thanh    NVARCHAR(100) NULL,
    quan_huyen    NVARCHAR(100) NULL,
    phuong_xa     NVARCHAR(100) NULL,
    CONSTRAINT FK_KhachHang_Users 
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Danh mục sản phẩm
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE DanhMucSanPham (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ten_danh_muc NVARCHAR(255) NOT NULL UNIQUE
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Sản Phẩm
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE SanPham (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ma_san_pham NVARCHAR(50)  NOT NULL UNIQUE,
    ten_san_pham NVARCHAR(255) NOT NULL,
    thuong_hieu  NVARCHAR(100) NOT NULL,
    so_gram      INT           CHECK (so_gram > 0),
    loai         NVARCHAR(100) NOT NULL, 
    nguon_goc    NVARCHAR(100) NOT NULL,
    han_su_dung  DATE          NOT NULL,
    so_luong     INT           CHECK (so_luong >= 0),
    gia_thanh    DECIMAL(18,2) CHECK (gia_thanh > 0),
    giam_gia     DECIMAL(5,2)  CHECK (giam_gia >= 0 AND giam_gia <= 100),
    danh_gia     FLOAT         CHECK (danh_gia >= 0 AND danh_gia <= 5),
    thanh_phan   NVARCHAR(MAX) NULL,
    created_at     DATE          NOT NULL DEFAULT GETDATE(),
    danh_muc_id  INT NULL,
    CONSTRAINT FK_SanPham_DanhMuc
        FOREIGN KEY (danh_muc_id) REFERENCES DanhMucSanPham(id) ON DELETE SET NULL
);
GO

ALTER TABLE SanPham ADD img_url NVARCHAR(MAX);

ALTER TABLE SanPham
ALTER COLUMN thuong_hieu  NVARCHAR(100) NULL;
ALTER TABLE SanPham
ALTER COLUMN so_gram      INT           NULL;
ALTER TABLE SanPham
ALTER COLUMN nguon_goc    NVARCHAR(100) NULL;
ALTER TABLE SanPham
ALTER COLUMN han_su_dung  DATE          NULL;
ALTER TABLE SanPham
ALTER COLUMN so_luong     INT           NULL;

ALTER TABLE SanPham ADD updated_at DATETIME NULL;
ALTER TABLE SanPham ADD updated_by NVARCHAR(255) NULL;


/* ─────────────────────────────────────────────
   BẢNG Ảnh Sản Phẩm – Cloudinary
   ───────────────────────────────────────────── */
CREATE TABLE SanPhamAnh (
    id            INT IDENTITY(1,1) PRIMARY KEY,     -- khoá chính
    san_pham_id   INT           NOT NULL,            -- FK ⇒ SanPham.id
    image_url     NVARCHAR(MAX) NOT NULL,            -- URL đầy đủ https://res.cloudinary.com/...
    public_id     NVARCHAR(255) NOT NULL,            -- egapets/products/P001/abc123
    format        NVARCHAR(20)  NULL,                -- jpg / png / webp ...
    width         INT           NULL,
    height        INT           NULL,
    bytes         INT           NULL,                -- kích thước file
    is_main       BIT           NOT NULL DEFAULT 0,  -- 1 = ảnh đại diện
    uploaded_at   DATETIME      NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_SanPhamAnh_SanPham
        FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX UQ_SanPhamAnh_Main
ON SanPhamAnh(san_pham_id)
WHERE is_main = 1;


-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Danh Sách Yêu Thích của Khách Hàng tới Sản Phẩm đó
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE DanhSachYeuThich (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    san_pham_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_YeuThich_Users FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT FK_YeuThich_SanPham FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE,
    CONSTRAINT UQ_User_Product UNIQUE (user_id, san_pham_id)  -- không được yêu thích trùng
);


-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Giỏ Hàng (Liên kết với Khách Hàng & Sản Phẩm)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE GioHang (
    id INT IDENTITY(1,1) PRIMARY KEY,
    khach_hang_id INT NOT NULL,
    san_pham_id   INT NOT NULL,
    so_luong      INT CHECK (so_luong > 0),
    gia           DECIMAL(18,2) CHECK (gia > 0),
    giam_gia      DECIMAL(5,2)  CHECK (giam_gia >= 0 AND giam_gia <= 100),
    CONSTRAINT FK_GioHang_KhachHang 
        FOREIGN KEY (khach_hang_id) REFERENCES KhachHang(id) ON DELETE CASCADE,
    CONSTRAINT FK_GioHang_SanPham 
        FOREIGN KEY (san_pham_id)   REFERENCES SanPham(id)   ON DELETE CASCADE
);
GO

ALTER TABLE GioHang
ADD session_id NVARCHAR(255) NULL;

ALTER TABLE GioHang
ADD is_guest BIT DEFAULT 0;

-- Thêm cột updated_at để cleanup dễ dàng
ALTER TABLE GioHang 
ADD updated_at DATETIME NOT NULL DEFAULT GETDATE();

ALTER TABLE GioHang
ALTER COLUMN khach_hang_id INT NULL;


-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Phương Thức Thanh Toán
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE PhuongThucThanhToan (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ten_phuong_thuc NVARCHAR(50) NOT NULL UNIQUE
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Hóa Đơn (Liên kết Khách Hàng, Nhân Viên, Phương Thức)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE HoaDon (
    id INT IDENTITY(1,1) PRIMARY KEY,
    khach_hang_id    INT NOT NULL,
    nhan_vien_id     INT NULL,
    ngay_dat         DATE NOT NULL DEFAULT GETDATE(),
    giam_gia_hoa_don DECIMAL(5,2) CHECK (giam_gia_hoa_don >= 0 AND giam_gia_hoa_don <= 100),
    tong_tien        DECIMAL(18,2) CHECK (tong_tien >= 0),
    trang_thai       NVARCHAR(50)  NOT NULL DEFAULT N'Chờ xác nhận',
    phuong_thuc_id   INT NOT NULL,
    ma_don_hang      NVARCHAR(20)  NOT NULL UNIQUE 
        DEFAULT CONCAT('DH', FORMAT(GETDATE(), 'yyyyMMdd'), RIGHT(NEWID(), 6)),
    ghi_chu          NVARCHAR(MAX) NULL,

    CONSTRAINT FK_HoaDon_KhachHang 
        FOREIGN KEY (khach_hang_id) REFERENCES KhachHang(id) ON DELETE NO ACTION,
    CONSTRAINT FK_HoaDon_NhanVien 
        FOREIGN KEY (nhan_vien_id)   REFERENCES NhanVien(id) ON DELETE SET NULL,
    CONSTRAINT FK_HoaDon_PhuongThuc 
        FOREIGN KEY (phuong_thuc_id) REFERENCES PhuongThucThanhToan(id) ON DELETE NO ACTION
);
GO

-- Optionally: Nếu cần liên kết Hóa Đơn ↔ Lịch Hẹn
ALTER TABLE HoaDon
ADD lich_hen_id INT NULL
GO

ALTER TABLE HoaDon
ADD CONSTRAINT FK_HoaDon_LichHen 
    FOREIGN KEY (lich_hen_id) REFERENCES LichHen(id) ON DELETE SET NULL;
GO


-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Chi Tiết Hóa Đơn
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE ChiTietHoaDon (
    id INT IDENTITY(1,1) PRIMARY KEY,
    hoa_don_id         INT NOT NULL,
    san_pham_id        INT NOT NULL,
    so_luong           INT CHECK (so_luong > 0),
    gia                DECIMAL(18,2) CHECK (gia > 0),
    giam_gia_san_pham  DECIMAL(5,2) CHECK (giam_gia_san_pham >= 0 AND giam_gia_san_pham <= 100),
    thanh_tien         AS ((so_luong * gia)*(1 - giam_gia_san_pham/100)) PERSISTED,

    CONSTRAINT FK_HoaDon 
        FOREIGN KEY (hoa_don_id)  REFERENCES HoaDon(id)   ON DELETE CASCADE,
    CONSTRAINT FK_SanPham 
        FOREIGN KEY (san_pham_id) REFERENCES SanPham(id)  ON DELETE CASCADE
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Lịch Sử Sản Phẩm
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE LichSuSanPham (
    id INT IDENTITY(1,1) PRIMARY KEY,
    san_pham_id       INT NULL,
    hanh_dong         NVARCHAR(50) NOT NULL, 
    thoi_gian         DATETIME     NOT NULL DEFAULT GETDATE(),
    nhan_vien_login   NVARCHAR(255) NOT NULL, 
    noi_dung_thay_doi NVARCHAR(MAX) NULL,

);
GO

ALTER TABLE LichSuSanPham
ADD CONSTRAINT FK_LichSuSanPham
    FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE SET NULL;


-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Chi Tiết Thanh Toán
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE ChiTietThanhToan (
    id INT IDENTITY(1,1) PRIMARY KEY,
    hoa_don_id      INT NOT NULL,
    phuong_thuc_id  INT NOT NULL,
    ma_giao_dich    NVARCHAR(100) NULL, 
    qr_code         NVARCHAR(MAX) NULL, 
    trang_thai      NVARCHAR(50)  NOT NULL DEFAULT N'Chờ thanh toán',
    ngay_thanh_toan DATETIME      NULL,

    CONSTRAINT FK_ChiTietThanhToan_HoaDon 
        FOREIGN KEY (hoa_don_id)     REFERENCES HoaDon(id)               ON DELETE CASCADE,
    CONSTRAINT FK_ChiTietThanhToan_PhuongThuc 
        FOREIGN KEY (phuong_thuc_id) REFERENCES PhuongThucThanhToan(id)  ON DELETE CASCADE
);
GO



-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Dịch Vụ
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE DichVu (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ten_dich_vu   NVARCHAR(255) NOT NULL,
    mo_ta         NVARCHAR(MAX) NULL,
    gia_mac_dinh  DECIMAL(18,2) NOT NULL CHECK (gia_mac_dinh >= 0)
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Chi Tiết Dịch Vụ (Phân loại giá theo cân nặng & loại lông)
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE DichVuChiTiet (
    id INT IDENTITY(1,1) PRIMARY KEY,
    dich_vu_id INT NOT NULL,
    can_nang   NVARCHAR(10) NOT NULL 
        CHECK (can_nang IN (N'<3kg', N'3-5kg', N'5-10kg', N'10-20kg', N'>20kg')),
    loai_long  NVARCHAR(10) NOT NULL 
        CHECK (loai_long IN (N'Ngắn', N'Dài')),
    gia        DECIMAL(18,2) NOT NULL CHECK (gia >= 0),

    CONSTRAINT FK_DichVuChiTiet_DichVu 
        FOREIGN KEY (dich_vu_id) REFERENCES DichVu(id) ON DELETE CASCADE
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG Lịch Hẹn
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE LichHen (
    id INT IDENTITY(1,1) PRIMARY KEY,
    khach_hang_id       INT NOT NULL,
    nhan_vien_id        INT NULL,
    dich_vu_id          INT NOT NULL,
    dich_vu_chi_tiet_id INT NOT NULL,
    ngay_hen            DATETIME NOT NULL,
    trang_thai          NVARCHAR(50) NOT NULL DEFAULT N'Chờ xác nhận'
        CHECK (trang_thai IN (N'Chờ xác nhận', N'Đã xác nhận', N'Hoàn thành', N'Hủy')),
    ghi_chu             NVARCHAR(MAX) NULL,

    -- 1) Khách Hàng xóa → xóa lịch hẹn (ON DELETE CASCADE)
    CONSTRAINT FK_LichHen_KhachHang 
        FOREIGN KEY (khach_hang_id) REFERENCES KhachHang(id) ON DELETE CASCADE,

    -- 2) Nhân Viên xóa → không xóa lịch, ta tự xử lý logic => NO ACTION hoặc SET NULL
    --    Ở đây ta chọn SET NULL, tránh multiple cascade paths.
    CONSTRAINT FK_LichHen_NhanVien
        FOREIGN KEY (nhan_vien_id) REFERENCES NhanVien(id) ON DELETE SET NULL,

    -- 3) Dịch Vụ tạm ngưng / hết hàng → KHÔNG tự xóa lịch => NO ACTION
    --    Shop gọi cho khách để đổi lịch hoặc khách hủy
    CONSTRAINT FK_LichHen_DichVu
        FOREIGN KEY (dich_vu_id) REFERENCES DichVu(id) ON DELETE NO ACTION,

    -- 4) Chi Tiết Dịch Vụ (cân nặng, lông...) cũng KHÔNG xóa tự động => NO ACTION
    CONSTRAINT FK_LichHen_DichVuChiTiet
        FOREIGN KEY (dich_vu_chi_tiet_id) REFERENCES DichVuChiTiet(id) ON DELETE NO ACTION
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG FaceID
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE FaceID (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    face_vector VARBINARY(MAX) NOT NULL, 
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL,
	pose NVARCHAR(50) NULL,

    CONSTRAINT FK_FaceID_Users
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- BẢNG FaceIDLogs
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE FaceIDLogs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    action NVARCHAR(50) NOT NULL, -- 'enroll' / 'verify' / 'failed'
    ip_address NVARCHAR(100) NULL,
    device_info NVARCHAR(255) NULL,
    result NVARCHAR(50) NOT NULL, -- 'success' / 'fail'
    created_at DATETIME DEFAULT GETDATE(),
    distance FLOAT NULL,

    CONSTRAINT FK_FaceIDLogs_Users
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- ─────────────────────────────────────────────────────────────────────────

SELECT * FROM Users

SELECT * FROM NhanVien

SELECT * FROM KhachHang

SELECT * FROM SanPham

SELECT * FROM DanhMucSanPham

SELECT * FROM SanPhamAnh

SELECT * FROM GioHang

SELECT * FROM PhuongThucThanhToan

SELECT * FROM HoaDon

SELECT * FROM ChiTietHoaDon

SELECT * FROM LichSuSanPham

SELECT * FROM ChiTietThanhToan

SELECT * FROM DichVu

SELECT * FROM DichVuChiTiet

SELECT * FROM LichHen;

SELECT * FROM FaceID;

SELECT * FROM FaceIDLogs;

SELECT TOP 1 reset_token 
FROM PasswordResets 
ORDER BY id DESC;

INSERT INTO Users(username, password_hash, role, email)
VALUES (
  N'demo1',
  HASHBYTES('SHA2_256', CONVERT(VARCHAR, N'123456')),  -- mật khẩu thật là: 123456
  N'KhachHang',
  N'demo@egapets1.local'
);

DECLARE @uid INT = SCOPE_IDENTITY();

INSERT INTO KhachHang(user_id, ho_ten, so_dien_thoai)
VALUES (@uid, N'Khách demo1', N'123123123123');
