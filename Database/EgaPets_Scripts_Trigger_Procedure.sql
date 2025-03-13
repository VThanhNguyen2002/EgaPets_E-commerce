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

CREATE PROCEDURE sp_InsertFaceEmbedding
    @user_id INT,
    @face_vector VARBINARY(MAX),
    @pose NVARCHAR(50)
AS
BEGIN
    INSERT INTO FaceID (user_id, face_vector, pose, created_at, updated_at)
    VALUES (@user_id, @face_vector, @pose, GETDATE(), GETDATE());

    INSERT INTO FaceIDLogs (user_id, action, result)
    VALUES (@user_id, 'enroll', 'success');
END;
GO

