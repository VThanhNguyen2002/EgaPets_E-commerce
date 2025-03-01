USE master;
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
    ngay_tao     DATE          NOT NULL DEFAULT GETDATE()
);
GO

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
    san_pham_id       INT NOT NULL,
    hanh_dong         NVARCHAR(50) NOT NULL, 
    thoi_gian         DATETIME     NOT NULL DEFAULT GETDATE(),
    nhan_vien_login   NVARCHAR(255) NOT NULL, 
    noi_dung_thay_doi NVARCHAR(MAX) NULL,

    CONSTRAINT FK_LichSuSanPham 
        FOREIGN KEY (san_pham_id) REFERENCES SanPham(id) ON DELETE CASCADE
);
GO

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


SELECT * FROM Users

SELECT * FROM NhanVien

SELECT * FROM KhachHang

SELECT * FROM SanPham

SELECT * FROM GioHang

SELECT * FROM PhuongThucThanhToan

SELECT * FROM HoaDon

SELECT * FROM ChiTietHoaDon

SELECT * FROM LichSuSanPham

SELECT * FROM ChiTietThanhToan

SELECT * FROM DichVu

SELECT * FROM DichVuChiTiet


-- ─────────────────────────────────────────────────────────────────────────
-- Data SanPham
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO SanPham (ma_san_pham, ten_san_pham, thuong_hieu, so_gram, loai, nguon_goc, han_su_dung, so_luong, gia_thanh, giam_gia, danh_gia, thanh_phan, ngay_tao)
VALUES
(N'P001', N'Royal Canin Medium Puppy', N'Royal Canin', 1000, N'Thức ăn cho chó', N'Pháp', '2026-05-15', 50, 350000, 10, 4.8, N'Protein, Vitamin E, DHA, Omega 3', GETDATE()),
(N'P002', N'Pedigree Adult Beef', N'Pedigree', 1200, N'Thức ăn cho chó', N'Mỹ', '2025-10-20', 30, 290000, 5, 4.5, N'Thịt bò, Canxi, Chất xơ', GETDATE()),
(N'P003', N'Whiskas Tuna Kitten', N'Whiskas', 500, N'Thức ăn cho mèo', N'Thái Lan', '2025-07-10', 40, 180000, 8, 4.7, N'Cá ngừ, Vitamin A, Taurine', GETDATE()),
(N'P004', N'Ganador Salmon Adult', N'Ganador', 1500, N'Thức ăn cho chó', N'Tây Ban Nha', '2025-12-12', 60, 420000, 12, 4.6, N'Cá hồi, Omega 6, Chất đạm', GETDATE()),
(N'P005', N'Me-O Chicken', N'Me-O', 800, N'Thức ăn cho mèo', N'Thái Lan', '2026-02-28', 55, 220000, 6, 4.4, N'Thịt gà, Taurine, Kẽm', GETDATE()),
(N'P006', N'Cesar Grilled Chicken', N'Cesar', 400, N'Thức ăn ướt cho chó', N'Mỹ', '2025-08-22', 25, 95000, 3, 4.9, N'Thịt gà nướng, Rau củ', GETDATE()),
(N'P007', N'Friskies Seafood Sensations', N'Friskies', 1000, N'Thức ăn cho mèo', N'Mỹ', '2026-03-30', 20, 270000, 7, 4.5, N'Tôm, Cá, Vitamin D', GETDATE()),
(N'P008', N'Cat Litter Charcoal', N'PetSafe', 5000, N'Vệ sinh cho mèo', N'Việt Nam', '2027-01-10', 100, 180000, 0, 4.8, N'Than hoạt tính, Đất sét', GETDATE()),
(N'P009', N'Pet Treats Bacon', N'JerHigh', 150, N'Bánh thưởng cho chó', N'Thái Lan', '2025-11-18', 35, 95000, 4, 4.6, N'Thịt xông khói, Vitamin B1', GETDATE()),
(N'P010', N'SmartHeart Gold Kitten', N'SmartHeart', 800, N'Thức ăn cho mèo con', N'Thái Lan', '2025-09-25', 45, 250000, 5, 4.9, N'Gà, DHA, Omega 3', GETDATE()),
(N'P011', N'Purina Pro Plan Puppy', N'Purina', 1200, N'Thức ăn cho chó', N'Mỹ', '2026-06-18', 38, 400000, 9, 4.7, N'Cá hồi, Beta-glucan, Kẽm', GETDATE()),
(N'P012', N'Vetoquinol Care Shampoo', N'Vetoquinol', 250, N'Sữa tắm cho chó mèo', N'Canada', '2026-04-22', 50, 190000, 10, 4.5, N'Chiết xuất thiên nhiên, Vitamin E', GETDATE()),
(N'P013', N'Fancy Feast Grilled Salmon', N'Fancy Feast', 85, N'Thức ăn ướt cho mèo', N'Mỹ', '2025-12-01', 70, 75000, 2, 4.9, N'Cá hồi, Gelatin, Vitamin A', GETDATE()),
(N'P014', N'Pawz Waterproof Boots', N'Pawz', 50, N'Phụ kiện cho chó', N'Mỹ', '2030-01-01', 30, 300000, 0, 4.3, N'Cao su thiên nhiên', GETDATE()),
(N'P015', N'PetSafe Drinkwell', N'PetSafe', 2000, N'Bình nước cho thú cưng', N'Anh', '2027-02-15', 10, 600000, 0, 4.8, N'Nhựa an toàn, Lọc than', GETDATE()),
(N'P016', N'Kong Classic Toy', N'Kong', 150, N'Đồ chơi cho chó', N'Mỹ', '2030-01-01', 60, 250000, 0, 4.9, N'Cao su tự nhiên', GETDATE()),
(N'P017', N'Hills Science Diet', N'Hills', 1200, N'Thức ăn cho chó', N'Mỹ', '2026-07-01', 32, 420000, 5, 4.7, N'Thịt bò, Glucosamine, Omega 6', GETDATE()),
(N'P018', N'Orijen Cat & Kitten', N'Orijen', 1800, N'Thức ăn cho mèo', N'Canada', '2026-10-12', 18, 690000, 8, 4.9, N'Cá hồi, Gan gà, Chất xơ', GETDATE()),
(N'P019', N'Pedigree Dentastix', N'Pedigree', 180, N'Bánh thưởng cho chó', N'Mỹ', '2026-03-25', 40, 85000, 5, 4.6, N'Xương sữa, Canxi', GETDATE()),
(N'P020', N'Sheba Chicken', N'Sheba', 70, N'Thức ăn ướt cho mèo', N'Đức', '2025-08-08', 75, 65000, 2, 4.8, N'Gà, Gelatin, Vitamin B', GETDATE());

-- ─────────────────────────────────────────────────────────────────────────
-- Data Users, KhachHang, NhanVien
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO Users (username, password_hash, role, email)
VALUES 
   (N'adminAccount',
    HASHBYTES('SHA2_256', 'AdminPassword123'),
    N'Admin',
    N'admin@egapets.com'),
    
   (N'employeeAccount',
    HASHBYTES('SHA2_256', 'EmployeePassword456'),
    N'NhanVien',
    N'employee@egapets.com'),
    
   (N'customerAccount',
    HASHBYTES('SHA2_256', 'CustomerPassword789'),
    N'KhachHang',
    N'customer@egapets.com');


---------------------------------------------
-- Tạo profile (hồ sơ) cho user NhanVien
---------------------------------------------
DECLARE @NhanVienUserId INT;
SET @NhanVienUserId = (SELECT id FROM Users WHERE username = N'employeeAccount');

INSERT INTO NhanVien (
   user_id,
   ho_ten,
   so_dien_thoai,
   ngay_sinh,
   dia_chi,
   chuc_vu,
   luong
)
VALUES
(
   @NhanVienUserId,
   N'Nguyễn Văn A',         -- Họ tên nhân viên
   N'0123456789',           -- Số điện thoại
   '1990-01-01',            -- Ngày sinh
   N'123 Đường ABC, Hà Nội',
   N'Nhân viên bán hàng',   -- Kiểm tra ràng buộc chuc_vu
   7000000                  -- Lương
);


---------------------------------------------
-- Tạo profile (hồ sơ) cho user Khách Hàng
---------------------------------------------
DECLARE @KhachHangUserId INT;
SET @KhachHangUserId = (SELECT id FROM Users WHERE username = N'customerAccount');

INSERT INTO KhachHang (
   user_id,
   ho_ten,
   so_dien_thoai,
   ngay_sinh,
   dia_chi,
   tinh_thanh,
   quan_huyen,
   phuong_xa
)
VALUES
(
   @KhachHangUserId,
   N'Trần Thị B',            -- Họ tên khách hàng
   N'0987654321',            -- Số điện thoại
   '1995-05-10',             -- Ngày sinh
   N'Số 456, Đường XYZ', 
   N'Hà Nội', 
   N'Đống Đa', 
   N'Láng Hạ'
);

-- ─────────────────────────────────────────────────────────────────────────
-- Data DichVu
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO DichVu (ten_dich_vu, mo_ta, gia_mac_dinh) VALUES
(N'Tắm rửa cho chó', N'Dịch vụ tắm sạch sẽ, khử mùi và dưỡng lông cho chó.', 100000),
(N'Tắm rửa cho mèo', N'Dịch vụ tắm dành riêng cho mèo, sử dụng dầu tắm chuyên dụng.', 120000),
(N'Cắt tỉa lông chó', N'Tạo kiểu, cắt lông theo yêu cầu cho thú cưng.', 150000),
(N'Cắt tỉa lông mèo', N'Tạo kiểu, cắt lông theo yêu cầu dành riêng cho mèo.', 130000),
(N'Vệ sinh tai', N'Vệ sinh sạch sẽ tai thú cưng, ngăn ngừa nhiễm trùng.', 50000),
(N'Cắt móng', N'Cắt móng an toàn, tránh thú cưng bị thương do móng dài.', 40000),
(N'Trọn gói spa chó', N'Tắm rửa, cắt tỉa lông, vệ sinh tai và cắt móng.', 250000),
(N'Trọn gói spa mèo', N'Tắm rửa, cắt tỉa lông, vệ sinh tai và cắt móng.', 230000);
GO
-- ─────────────────────────────────────────────────────────────────────────
-- Data DichVuChiTiet
-- ─────────────────────────────────────────────────────────────────────────

INSERT INTO DichVuChiTiet (dich_vu_id, can_nang, loai_long, gia) VALUES
-- Tắm rửa cho chó
(1, N'<3kg', N'Ngắn', 80000),
(1, N'<3kg', N'Dài', 90000),
(1, N'3-5kg', N'Ngắn', 100000),
(1, N'3-5kg', N'Dài', 110000),
(1, N'5-10kg', N'Ngắn', 120000),
(1, N'5-10kg', N'Dài', 130000),
(1, N'10-20kg', N'Ngắn', 150000),
(1, N'10-20kg', N'Dài', 170000),
(1, N'>20kg', N'Ngắn', 200000),
(1, N'>20kg', N'Dài', 220000),

-- Tắm rửa cho mèo
(2, N'<3kg', N'Ngắn', 100000),
(2, N'<3kg', N'Dài', 110000),
(2, N'3-5kg', N'Ngắn', 120000),
(2, N'3-5kg', N'Dài', 130000),
(2, N'5-10kg', N'Ngắn', 140000),
(2, N'5-10kg', N'Dài', 150000),

-- Cắt tỉa lông chó
(3, N'<3kg', N'Ngắn', 120000),
(3, N'<3kg', N'Dài', 130000),
(3, N'3-5kg', N'Ngắn', 140000),
(3, N'3-5kg', N'Dài', 150000),
(3, N'5-10kg', N'Ngắn', 160000),
(3, N'5-10kg', N'Dài', 170000),

-- Cắt tỉa lông mèo
(4, N'<3kg', N'Ngắn', 110000),
(4, N'<3kg', N'Dài', 120000),
(4, N'3-5kg', N'Ngắn', 130000),
(4, N'3-5kg', N'Dài', 140000),

-- Vệ sinh tai
(5, N'<3kg', N'Ngắn', 50000),
(5, N'<3kg', N'Dài', 50000),
(5, N'3-5kg', N'Ngắn', 60000),
(5, N'3-5kg', N'Dài', 60000),

-- Cắt móng
(6, N'<3kg', N'Ngắn', 40000),
(6, N'<3kg', N'Dài', 40000),
(6, N'3-5kg', N'Ngắn', 50000),
(6, N'3-5kg', N'Dài', 50000),

-- Trọn gói spa chó
(7, N'<3kg', N'Ngắn', 220000),
(7, N'<3kg', N'Dài', 230000),
(7, N'3-5kg', N'Ngắn', 250000),
(7, N'3-5kg', N'Dài', 260000),

-- Trọn gói spa mèo
(8, N'<3kg', N'Ngắn', 200000),
(8, N'<3kg', N'Dài', 210000),
(8, N'3-5kg', N'Ngắn', 220000),
(8, N'3-5kg', N'Dài', 230000);
GO

-- ─────────────────────────────────────────────────────────────────────────
-- Data PhuongThucThanhToan
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO PhuongThucThanhToan (ten_phuong_thuc) 
VALUES 
(N'Chuyển khoản Momo'),
(N'Chuyển khoản Ngân hàng');
GO
