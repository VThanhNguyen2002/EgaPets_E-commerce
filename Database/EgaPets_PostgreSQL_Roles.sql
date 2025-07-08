-- PostgreSQL Roles and Permissions Script for EgaPets
-- Converted from SQL Server to PostgreSQL

-- Connect to the database
\c egapets_db;

-- ─────────────────────────────────────────────────────────────────────────
-- Create Roles
-- ─────────────────────────────────────────────────────────────────────────

-- Create Admin Role
CREATE ROLE role_admin;

-- Create Employee Role
CREATE ROLE role_nhanvien;

-- Create Customer Role
CREATE ROLE role_khachhang;

-- ─────────────────────────────────────────────────────────────────────────
-- Grant Permissions to Roles
-- ─────────────────────────────────────────────────────────────────────────

-- Admin Role - Full database access
GRANT ALL PRIVILEGES ON DATABASE egapets_db TO role_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO role_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO role_admin;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO role_admin;

-- Employee Role - Can manage products, orders, customers
GRANT SELECT, INSERT, UPDATE, DELETE ON SanPham TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON SanPhamAnh TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON DanhMucSanPham TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON HoaDon TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON ChiTietHoaDon TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON KhachHang TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON GioHang TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON DanhSachYeuThich TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON LichHen TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON DichVu TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON DichVuChiTiet TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON ChiTietThanhToan TO role_nhanvien;
GRANT SELECT, INSERT, UPDATE, DELETE ON LichSuSanPham TO role_nhanvien;
GRANT SELECT ON Users TO role_nhanvien;
GRANT SELECT ON NhanVien TO role_nhanvien;
GRANT SELECT ON PhuongThucThanhToan TO role_nhanvien;

-- Grant sequence usage for employees
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO role_nhanvien;

-- Customer Role - Limited read access and own data management
GRANT SELECT ON SanPham TO role_khachhang;
GRANT SELECT ON SanPhamAnh TO role_khachhang;
GRANT SELECT ON DanhMucSanPham TO role_khachhang;
GRANT SELECT ON DichVu TO role_khachhang;
GRANT SELECT ON DichVuChiTiet TO role_khachhang;
GRANT SELECT ON PhuongThucThanhToan TO role_khachhang;

-- Customers can manage their own data
GRANT SELECT, INSERT, UPDATE, DELETE ON HoaDon TO role_khachhang;
GRANT SELECT, INSERT, UPDATE, DELETE ON ChiTietHoaDon TO role_khachhang;
GRANT SELECT, INSERT, UPDATE, DELETE ON GioHang TO role_khachhang;
GRANT SELECT, INSERT, UPDATE, DELETE ON DanhSachYeuThich TO role_khachhang;
GRANT SELECT, INSERT, UPDATE, DELETE ON LichHen TO role_khachhang;
GRANT SELECT, INSERT, UPDATE, DELETE ON ChiTietThanhToan TO role_khachhang;
GRANT SELECT, UPDATE ON KhachHang TO role_khachhang;

-- Grant sequence usage for customers
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO role_khachhang;

-- ─────────────────────────────────────────────────────────────────────────
-- Create Login Users and Assign Roles
-- ─────────────────────────────────────────────────────────────────────────

-- Create login users
CREATE USER admin_user WITH PASSWORD 'AdminPassword123';
CREATE USER employee_user WITH PASSWORD 'EmployeePassword456';
CREATE USER customer_user WITH PASSWORD 'CustomerPassword789';

-- Assign roles to users
GRANT role_admin TO admin_user;
GRANT role_nhanvien TO employee_user;
GRANT role_khachhang TO customer_user;

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security (RLS) for Customer Data Protection
-- ─────────────────────────────────────────────────────────────────────────

-- Enable RLS on sensitive tables
ALTER TABLE KhachHang ENABLE ROW LEVEL SECURITY;
ALTER TABLE HoaDon ENABLE ROW LEVEL SECURITY;
ALTER TABLE GioHang ENABLE ROW LEVEL SECURITY;
ALTER TABLE DanhSachYeuThich ENABLE ROW LEVEL SECURITY;
ALTER TABLE LichHen ENABLE ROW LEVEL SECURITY;

-- Create policies for customers to only access their own data
CREATE POLICY khachhang_policy ON KhachHang
    FOR ALL TO role_khachhang
    USING (user_id = (SELECT id FROM Users WHERE username = current_user));

CREATE POLICY hoadon_policy ON HoaDon
    FOR ALL TO role_khachhang
    USING (khach_hang_id = (SELECT id FROM KhachHang WHERE user_id = (SELECT id FROM Users WHERE username = current_user)));

CREATE POLICY giohang_policy ON GioHang
    FOR ALL TO role_khachhang
    USING (khach_hang_id = (SELECT id FROM KhachHang WHERE user_id = (SELECT id FROM Users WHERE username = current_user)) OR khach_hang_id IS NULL);

CREATE POLICY danhsachyeuthich_policy ON DanhSachYeuThich
    FOR ALL TO role_khachhang
    USING (khach_hang_id = (SELECT id FROM KhachHang WHERE user_id = (SELECT id FROM Users WHERE username = current_user)));

CREATE POLICY lichhen_policy ON LichHen
    FOR ALL TO role_khachhang
    USING (khach_hang_id = (SELECT id FROM KhachHang WHERE user_id = (SELECT id FROM Users WHERE username = current_user)));

-- Admin and employees can access all data
CREATE POLICY admin_full_access ON KhachHang FOR ALL TO role_admin USING (true);
CREATE POLICY admin_full_access_hoadon ON HoaDon FOR ALL TO role_admin USING (true);
CREATE POLICY admin_full_access_giohang ON GioHang FOR ALL TO role_admin USING (true);
CREATE POLICY admin_full_access_danhsach ON DanhSachYeuThich FOR ALL TO role_admin USING (true);
CREATE POLICY admin_full_access_lichhen ON LichHen FOR ALL TO role_admin USING (true);

CREATE POLICY employee_full_access ON KhachHang FOR ALL TO role_nhanvien USING (true);
CREATE POLICY employee_full_access_hoadon ON HoaDon FOR ALL TO role_nhanvien USING (true);
CREATE POLICY employee_full_access_giohang ON GioHang FOR ALL TO role_nhanvien USING (true);
CREATE POLICY employee_full_access_danhsach ON DanhSachYeuThich FOR ALL TO role_nhanvien USING (true);
CREATE POLICY employee_full_access_lichhen ON LichHen FOR ALL TO role_nhanvien USING (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Display Role Information
-- ─────────────────────────────────────────────────────────────────────────

-- Query to show role permissions (PostgreSQL equivalent)
SELECT 
    r.rolname as role_name,
    t.schemaname,
    t.tablename,
    p.privilege_type
FROM 
    information_schema.role_table_grants p
JOIN 
    pg_roles r ON p.grantee = r.rolname
JOIN 
    information_schema.tables t ON p.table_name = t.table_name
WHERE 
    r.rolname IN ('role_admin', 'role_nhanvien', 'role_khachhang')
    AND t.table_schema = 'public'
ORDER BY 
    r.rolname, t.tablename, p.privilege_type;

-- Show users and their roles
SELECT 
    u.usename as username,
    r.rolname as role_name
FROM 
    pg_user u
JOIN 
    pg_auth_members m ON u.usesysid = m.member
JOIN 
    pg_roles r ON m.roleid = r.oid
WHERE 
    u.usename IN ('admin_user', 'employee_user', 'customer_user')
ORDER BY 
    u.usename;

\echo 'PostgreSQL roles and permissions setup completed successfully!';