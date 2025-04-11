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

DROP Trigger
GO

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

