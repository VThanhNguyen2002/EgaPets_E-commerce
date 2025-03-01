USE EgaPets_DB;
GO

DISABLE TRIGGER trg_InsertSanPham ON SanPham;
ENABLE TRIGGER trg_InsertSanPham ON SanPham;
GO

--  Kiểm tra danh sách Trigger đang tồn tại
SELECT 
    t.name AS TriggerName,
    OBJECT_NAME(t.parent_id) AS TableName,
    t.type_desc AS TriggerType,
    t.is_disabled AS IsDisabled
FROM sys.triggers t;
GO

-- Kiểm tra danh sách Stored Procedure
SELECT 
    name AS ProcedureName,
    create_date AS CreatedDate,
    modify_date AS LastModifiedDate
FROM sys.procedures
ORDER BY modify_date DESC;

-- Kiểm tra Trigger nào được kích hoạt gần đây
SELECT 
    name AS TriggerName,
    OBJECT_NAME(parent_id) AS TableName,
    create_date AS CreatedDate,
    modify_date AS LastModifiedDate,
    is_disabled AS IsDisabled
FROM sys.triggers
ORDER BY modify_date DESC;
GO

-- Kiểm tra Trigger gắn với bảng nào
SELECT 
    t.name AS TriggerName,
    p.name AS ParentTable,
    t.type_desc AS TriggerType
FROM sys.triggers t
JOIN sys.objects p ON t.parent_id = p.object_id;
GO

DROP Trigger trg_InsertSanPham
GO

-- Tạo TRIGGER log thay đổi
	--  🔹 Khi thêm sản phẩm (INSERT)
CREATE TRIGGER trg_InsertSanPham
ON SanPham
AFTER INSERT
AS
BEGIN
    INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
    SELECT i.id, 'INSERT', CURRENT_USER, 
        CONCAT(N'Thêm sản phẩm: ', i.ten_san_pham, N' - Giá: ', i.gia_thanh)
    FROM inserted i;
END;
GO

DISABLE TRIGGER trg_InsertSanPham ON SanPham;
ENABLE TRIGGER trg_InsertSanPham ON SanPham;
GO

	-- 🔹 Khi cập nhật sản phẩm (UPDATE)
CREATE TRIGGER trg_UpdateSanPham
ON SanPham
AFTER UPDATE
AS
BEGIN
    INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
    SELECT i.id, 'UPDATE', CURRENT_USER, 
        CONCAT(N'Cập nhật sản phẩm: ', i.ten_san_pham, 
               N' - Giá cũ: ', d.gia_thanh, N' → Giá mới: ', i.gia_thanh)
    FROM inserted i
    JOIN deleted d ON i.id = d.id;
END;
GO

	-- 🔹 Khi xóa sản phẩm (DELETE)
CREATE TRIGGER trg_DeleteSanPham
ON SanPham
AFTER DELETE
AS
BEGIN
    INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
    SELECT d.id, 'DELETE', CURRENT_USER, 
        CONCAT(N'Xóa sản phẩm: ', d.ten_san_pham)
    FROM deleted d;
END;
GO

-- Stored Procedure: Tạo đơn hàng & Sinh QR Code
CREATE PROCEDURE TaoDonHang
    @ten_khach_hang NVARCHAR(255),
    @email NVARCHAR(255),
    @so_dien_thoai NVARCHAR(15),
    @dia_chi NVARCHAR(255),
    @tinh_thanh NVARCHAR(100),
    @quan_huyen NVARCHAR(100),
    @phuong_xa NVARCHAR(100),
    @ghi_chu NVARCHAR(MAX),
    @phuong_thuc_id INT,
    @tong_tien DECIMAL(18,2),
    @hoa_don_id INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Tạo đơn hàng
    INSERT INTO HoaDon (ten_khach_hang, email, so_dien_thoai, dia_chi, tinh_thanh, quan_huyen, phuong_xa, ghi_chu, phuong_thuc_id, tong_tien)
    VALUES (@ten_khach_hang, @email, @so_dien_thoai, @dia_chi, @tinh_thanh, @quan_huyen, @phuong_xa, @ghi_chu, @phuong_thuc_id, @tong_tien);

    -- Lấy ID của đơn hàng mới tạo
    SET @hoa_don_id = SCOPE_IDENTITY();

    -- Kiểm tra nếu @hoa_don_id bị NULL thì không tiếp tục
    IF @hoa_don_id IS NULL
    BEGIN
        PRINT N'Lỗi: Không thể lấy ID đơn hàng mới!';
        RETURN;
    END

    -- Tạo QR Code nếu thanh toán qua chuyển khoản
    INSERT INTO ChiTietThanhToan (hoa_don_id, phuong_thuc_id, qr_code)
    VALUES (
        @hoa_don_id, 
        @phuong_thuc_id,
        CASE 
            WHEN @phuong_thuc_id = (SELECT id FROM PhuongThucThanhToan WHERE ten_phuong_thuc = N'Chuyển khoản Momo') 
                THEN CONCAT('https://momo.vn/pay?amount=', @tong_tien, '&note=Thanh toán đơn hàng ', (SELECT ma_don_hang FROM HoaDon WHERE id = @hoa_don_id))
            WHEN @phuong_thuc_id = (SELECT id FROM PhuongThucThanhToan WHERE ten_phuong_thuc = N'Chuyển khoản ZaloPay') 
                THEN CONCAT('https://zalopay.vn/pay?amount=', @tong_tien, '&note=Thanh toán đơn hàng ', (SELECT ma_don_hang FROM HoaDon WHERE id = @hoa_don_id))
            ELSE NULL
        END
    );
END;
GO

DECLARE @hoa_don_id INT;
DECLARE @phuong_thuc_id INT;

-- Gán giá trị cho @phuong_thuc_id
SELECT @phuong_thuc_id = id FROM PhuongThucThanhToan WHERE ten_phuong_thuc = N'Chuyển khoản Momo';

-- Kiểm tra nếu @phuong_thuc_id bị NULL
IF @phuong_thuc_id IS NULL
BEGIN
    PRINT N'Lỗi: Không tìm thấy phương thức thanh toán!';
    RETURN;
END

-- Gọi Stored Procedure với OUTPUT
EXEC TaoDonHang 
    @ten_khach_hang = N'Nguyễn Văn A',
    @email = N'abc@example.com',
    @so_dien_thoai = N'0901234567',
    @dia_chi = N'123 Đường ABC, TP.HCM',
    @tinh_thanh = N'Hồ Chí Minh',
    @quan_huyen = N'Quận 1',
    @phuong_xa = N'Phường Bến Nghé',
    @ghi_chu = N'Giao nhanh trước 18h',
    @phuong_thuc_id = @phuong_thuc_id,
    @tong_tien = 60000,
    @hoa_don_id = @hoa_don_id OUTPUT;

-- Kiểm tra kết quả
PRINT N'Mã đơn hàng được tạo: ' + CAST(@hoa_don_id AS NVARCHAR);
GO

SELECT * FROM HoaDon ORDER BY ngay_dat DESC;
SELECT * FROM ChiTietThanhToan ORDER BY ngay_thanh_toan DESC;

SELECT qr_code FROM ChiTietThanhToan WHERE hoa_don_id = @hoa_don_id;
GO

-- Trigger: Cập nhật trạng thái đơn hàng sau khi thanh toán
CREATE TRIGGER trg_UpdateThanhToan
ON ChiTietThanhToan
AFTER UPDATE
AS
BEGIN
    IF UPDATE(trang_thai)
    BEGIN
        UPDATE HoaDon
        SET trang_thai = N'Đã thanh toán'
        WHERE id IN (SELECT hoa_don_id FROM inserted WHERE trang_thai = N'Đã thanh toán');
    END
END;
GO

-- Đăng ký tài khoản
CREATE PROCEDURE DangKyTaiKhoan
    @username NVARCHAR(255),
    @password NVARCHAR(255),
    @role NVARCHAR(50),
    @email NVARCHAR(255)
AS
BEGIN
    -- Kiểm tra trùng lặp
    IF EXISTS (SELECT 1 FROM Users WHERE username = @username OR email = @email)
    BEGIN
        PRINT N'Tài khoản hoặc email đã tồn tại!';
        RETURN;
    END

    -- Thêm tài khoản mới
    INSERT INTO Users (username, password_hash, role, email)
    VALUES (@username, HASHBYTES('SHA2_256', @password), @role, @email);
END;
GO

EXEC DangKyTaiKhoan 
    @username = N'testuser',
    @password = N'Test@123',
    @role = N'KhachHang',
    @email = N'test@example.com';
GO

-- Đăng nhập (Kiểm tra tài khoản)
CREATE PROCEDURE DangNhap
    @username NVARCHAR(255),
    @password NVARCHAR(255)
AS
BEGIN
    -- Kiểm tra đăng nhập
    IF EXISTS (SELECT 1 FROM Users WHERE username = @username AND password_hash = HASHBYTES('SHA2_256', @password))
    BEGIN
        SELECT id, username, role, email FROM Users WHERE username = @username;
    END
    ELSE
    BEGIN
        PRINT N'Sai tên đăng nhập hoặc mật khẩu!';
    END
END;
GO

EXEC DangNhap 
    @username = N'testuser',
    @password = N'Test@123';
GO
