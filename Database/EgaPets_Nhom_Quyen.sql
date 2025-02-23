USE master;
GO

-- 1. Tạo Logins trên SQL Server
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = 'Admin')
    CREATE LOGIN Admin WITH PASSWORD = 'Admin@123';
    
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = 'NhanVien')
    CREATE LOGIN NhanVien WITH PASSWORD = 'NhanVien@123';

IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = 'KhachHang')
    CREATE LOGIN KhachHang WITH PASSWORD = 'KhachHang@123';
GO

-- 2. Chuyển vào database EgaPets_DB
USE EgaPets_DB;
GO

-- 3. Tạo Users trong Database và gán với Logins
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'Admin')
    CREATE USER Admin FOR LOGIN Admin;
    
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'NhanVien')
    CREATE USER NhanVien FOR LOGIN NhanVien;

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'KhachHang')
    CREATE USER KhachHang FOR LOGIN KhachHang;
GO

-- 4. Tạo Database Roles nếu chưa tồn tại
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'Role_Admin')
    CREATE ROLE Role_Admin;
    
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'Role_NhanVien')
    CREATE ROLE Role_NhanVien;

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'Role_KhachHang')
    CREATE ROLE Role_KhachHang;
GO

-- 5. Gán quyền cho các nhóm

-- Admin có toàn quyền trên database
ALTER ROLE Role_Admin ADD MEMBER Admin;
GRANT CONTROL ON DATABASE::EgaPets_DB TO Role_Admin;

-- Nhân Viên có quyền:
-- 1. Xem bảng Hóa Đơn (SELECT)
-- 2. Xem và chỉnh sửa thông tin cá nhân trong bảng Nhân Viên
-- 3. CRUD trên bảng Sản phẩm
ALTER ROLE Role_NhanVien ADD MEMBER NhanVien;
GRANT SELECT ON dbo.HoaDon TO Role_NhanVien;
GRANT SELECT, UPDATE ON dbo.NhanVien TO Role_NhanVien;
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.SanPham TO Role_NhanVien;

-- Khách Hàng có quyền:
-- 1. Xem sản phẩm (SELECT)
-- 2. Xem hóa đơn của chính mình (SELECT)
ALTER ROLE Role_KhachHang ADD MEMBER KhachHang;
GRANT SELECT ON dbo.SanPham TO Role_KhachHang;
GRANT SELECT ON dbo.HoaDon TO Role_KhachHang;
GO

-- Tạo tài khoản Nhân Viên mới
DECLARE @NhanVienUsername NVARCHAR(50) = 'NhanVien_02';
DECLARE @NhanVienPassword NVARCHAR(50) = 'NhanVien@456';

IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = @NhanVienUsername)
BEGIN
    EXEC sp_addlogin @loginame = @NhanVienUsername, @passwd = @NhanVienPassword;
    USE EgaPets_DB;
    CREATE USER [NhanVien_02] FOR LOGIN [NhanVien_02];
    ALTER ROLE Role_NhanVien ADD MEMBER [NhanVien_02];
END
GO

-- Tạo tài khoản Khách Hàng mới
DECLARE @KhachHangUsername NVARCHAR(50) = 'KhachHang_02';
DECLARE @KhachHangPassword NVARCHAR(50) = 'KhachHang@456';

IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = @KhachHangUsername)
BEGIN
    EXEC sp_addlogin @loginame = @KhachHangUsername, @passwd = @KhachHangPassword;
    USE EgaPets_DB;
    CREATE USER [KhachHang_02] FOR LOGIN [KhachHang_02];
    ALTER ROLE Role_KhachHang ADD MEMBER [KhachHang_02];
END
GO
