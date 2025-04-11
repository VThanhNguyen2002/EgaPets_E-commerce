USE EgaPets_DB;
GO

CREATE OR ALTER PROCEDURE usp_insertFaceID
    @UserID INT,
    @FaceVector VARBINARY(MAX),
    @Pose NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO FaceID (user_id, face_vector, pose)
    VALUES (@UserID, @FaceVector, @Pose);

    -- # Ghi log
    INSERT INTO FaceIDLogs (user_id, action, result)
    VALUES (@UserID, 'enroll', 'success');
END;
GO
