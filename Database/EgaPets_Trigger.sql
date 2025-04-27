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

DROP Trigger trg_UpdateFaceID_Logs
GO

/*──────────────────────────────────────*
 * Trigger INSERT LOG  / UPDATE FaceID  *
 *──────────────────────────────────────*/
-- Ví dụ: Trigger ghi log khi FaceID bị cập nhật.
CREATE TRIGGER trg_UpdateFaceID_Logs
ON FaceID
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- # Mỗi lần update face_vector, ghi 1 record vào FaceIDLogs
    INSERT INTO FaceIDLogs (user_id, action, result, ip_address, device_info)
    SELECT 
        i.user_id,
        N'update-embedding' AS action,
        N'success' AS result,
        'SYSTEM_TRIGGER' AS ip_address,
        'DB_TRIGGER' AS device_info
    FROM Inserted i
    JOIN Deleted d ON i.id = d.id 
    WHERE i.face_vector != d.face_vector;  -- Chỉ log nếu vector thay đổi
END;
GO

/*───────────────────────────────────*
 * Trigger INSERT  / UPDATE SANPHAM  *
 *───────────────────────────────────*/
CREATE OR ALTER TRIGGER trg_SanPham_InsertUpdate
ON SanPham
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    /* INSERT */
    INSERT LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
    SELECT  i.id,
            CASE WHEN d.id IS NULL THEN N'Thêm' ELSE N'Sửa' END,
            SYSTEM_USER,
            CASE
               WHEN d.id IS NULL THEN N'Thêm mới sản phẩm'
               ELSE CONCAT(
                    N'Tên: ', d.ten_san_pham, N' ➜ ', i.ten_san_pham, N'; ',
                    N'Giá: ', d.gia_thanh,    N' ➜ ', i.gia_thanh
               )
            END
    FROM inserted i
    LEFT JOIN deleted d ON d.id = i.id;   -- deleted NULL → INSERT
END
GO

/*───────────────────────────*
 * Trigger DELETE SANPHAM    *
 *───────────────────────────*/
CREATE OR ALTER TRIGGER trg_SanPham_Delete
ON SanPham
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
    SELECT id, N'Xóa', SYSTEM_USER, N'Đã xóa sản phẩm'
    FROM deleted;
END
GO

/*───────────────────────────*
 * Trigger ADD Profile User    *
 *───────────────────────────*/
CREATE OR ALTER TRIGGER trg_User_AfterInsert
ON Users
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  INSERT KhachHang (user_id, ho_ten, so_dien_thoai)
  SELECT id, username, ''          -- default
  FROM inserted
  WHERE role = N'KhachHang';

  INSERT NhanVien (user_id, ho_ten, so_dien_thoai, chuc_vu, luong)
  SELECT id, username, '', 0
  FROM inserted
  WHERE role = N'NhanVien';
END
GO

-- Tự động chạm updated_at khi UPDATE số lượng
CREATE OR ALTER TRIGGER trg_GioHang_touch
ON GioHang
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE g
      SET updated_at = GETDATE()
    FROM GioHang g
    JOIN inserted i ON g.id = i.id;
END