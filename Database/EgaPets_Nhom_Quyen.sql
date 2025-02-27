USE master;
GO

-- Kiểm tra và ngắt tất cả kết nối đến database
ALTER DATABASE EgaPets_DB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

SELECT name FROM sys.databases;
GO


-- Xóa database
DROP DATABASE EgaPets_DB;
GO


use EgaPets_DB;

CREATE ROLE Role_Admin;
CREATE ROLE Role_NhanVien;
CREATE ROLE Role_KhachHang;
GO

-- Cấp quyền cho Nhân viên
GRANT SELECT, INSERT, UPDATE, DELETE ON SanPham TO Role_NhanVien;

-- Cấp quyền cho Khách hàng
GRANT SELECT ON SanPham TO Role_KhachHang;
GRANT SELECT ON HoaDon TO Role_KhachHang;

-- Cấp quyền quản lý toàn bộ database cho Admin
GRANT CONTROL ON DATABASE::EgaPets_DB TO Role_Admin;
GO

SELECT dp.name AS RoleName, 
       o.name AS ObjectName, 
       p.permission_name 
FROM sys.database_permissions p
JOIN sys.database_principals dp ON p.grantee_principal_id = dp.principal_id
JOIN sys.objects o ON p.major_id = o.object_id
WHERE dp.name IN ('Role_Admin', 'Role_NhanVien', 'Role_KhachHang');
GO


