CREATE DATABASE EgaPets_DB;

USE EgaPets_DB;
GO

CREATE TABLE SanPham (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ma_san_pham NVARCHAR(50) NOT NULL UNIQUE,
    ten_san_pham NVARCHAR(255) NOT NULL,
    thuong_hieu NVARCHAR(100) NOT NULL,
    so_gram INT CHECK (so_gram > 0),
    loai NVARCHAR(100) NOT NULL, -- Ví dụ: "Thì cho chó", "Cá ngừ", "Hỗn hợp"
    nguon_goc NVARCHAR(100) NOT NULL,
    han_su_dung DATE NOT NULL,
    so_luong INT CHECK (so_luong >= 0),
    gia_thanh DECIMAL(18,2) CHECK (gia_thanh > 0),
    giam_gia DECIMAL(5,2) CHECK (giam_gia >= 0 AND giam_gia <= 100),
    danh_gia FLOAT CHECK (danh_gia >= 0 AND danh_gia <= 5),
    thanh_phan NVARCHAR(MAX) NULL -- Thành phần dinh dưỡng, nguyên liệu
);
GO

CREATE TABLE GioHang (
    id INT IDENTITY(1,1) PRIMARY KEY,
    san_pham_id INT NOT NULL,
    ten_san_pham NVARCHAR(255) NOT NULL,
    so_luong INT CHECK (so_luong > 0),
    gia DECIMAL(18,2) CHECK (gia > 0),
    giam_gia DECIMAL(5,2) CHECK (giam_gia >= 0 AND giam_gia <= 100),

    CONSTRAINT FK_GioHang_SanPham FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE
);
GO

CREATE TABLE HoaDon (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ten_khach_hang NVARCHAR(255) NOT NULL,
    ngay_dat DATE NOT NULL DEFAULT GETDATE(),
    giam_gia_hoa_don DECIMAL(5,2) CHECK (giam_gia_hoa_don >= 0 AND giam_gia_hoa_don <= 100),
    tong_tien DECIMAL(18,2) CHECK (tong_tien >= 0)
);
GO

ALTER TABLE HoaDon ADD 
    nhan_vien_id INT NULL, 
    trang_thai NVARCHAR(50) NOT NULL DEFAULT N'Chờ xác nhận',
    CONSTRAINT FK_HoaDon_NhanVien FOREIGN KEY (nhan_vien_id) REFERENCES NhanVien(id) ON DELETE SET NULL;
GO


CREATE TABLE ChiTietHoaDon (
    id INT IDENTITY(1,1) PRIMARY KEY,
    hoa_don_id INT NOT NULL,
    san_pham_id INT NOT NULL,
    so_luong INT CHECK (so_luong > 0),
    gia DECIMAL(18,2) CHECK (gia > 0),
    giam_gia_san_pham DECIMAL(5,2) CHECK (giam_gia_san_pham >= 0 AND giam_gia_san_pham <= 100),
    thanh_tien AS ((so_luong * gia) * (1 - giam_gia_san_pham / 100)) PERSISTED, -- Tự động tính giá sau giảm

    CONSTRAINT FK_HoaDon FOREIGN KEY (hoa_don_id) REFERENCES HoaDon(id) ON DELETE CASCADE,
    CONSTRAINT FK_SanPham FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE
);
GO

CREATE TABLE LichSuSanPham (
    id INT IDENTITY(1,1) PRIMARY KEY,
    san_pham_id INT NOT NULL,
    hanh_dong NVARCHAR(50) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    thoi_gian DATETIME NOT NULL DEFAULT GETDATE(),
    nhan_vien_login NVARCHAR(255) NOT NULL, -- Lưu tài khoản nhân viên
    noi_dung_thay_doi NVARCHAR(MAX) NULL, -- Mô tả sự thay đổi
    CONSTRAINT FK_LichSuSanPham FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE
);
GO

ALTER TABLE LichSuSanPham ADD 
    nhan_vien_id INT NULL,
    CONSTRAINT FK_LichSuSanPham_NhanVien FOREIGN KEY (nhan_vien_id) REFERENCES NhanVien(id) ON DELETE SET NULL;
GO


CREATE TABLE NhanVien (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ho_ten NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    so_dien_thoai NVARCHAR(15) NOT NULL UNIQUE,
    ngay_sinh DATE NULL,
    dia_chi NVARCHAR(255) NULL,
    ngay_vao_lam DATE NOT NULL DEFAULT GETDATE(),
    chuc_vu NVARCHAR(100) NOT NULL CHECK (chuc_vu IN (N'Nhân viên bán hàng', N'Quản lý kho', N'Admin')),
    luong DECIMAL(18,2) CHECK (luong >= 0)
);
GO

SELECT * FROM NhanVien

SELECT * FROM ChiTietHoaDon

SELECT * FROM HoaDon

SELECT * FROM GioHang

SELECT * FROM LichSuSanPham

SELECT * FROM SanPham
