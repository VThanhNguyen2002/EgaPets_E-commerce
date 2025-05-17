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

-- Stored Procedure (tuỳ chọn) ghi nhiều ảnh
CREATE OR ALTER PROCEDURE dbo.usp_InsertProductImage
    @MaSanPham   NVARCHAR(50),
    @ImageUrl    NVARCHAR(MAX),
    @PublicId    NVARCHAR(255),
    @Format      NVARCHAR(20),
    @Width       INT          = NULL,
    @Height      INT          = NULL,
    @Bytes       INT          = NULL,
    @IsMain      BIT          = 0
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @spId INT;
    SELECT @spId = id
    FROM   dbo.SanPham
    WHERE  ma_san_pham = @MaSanPham;

    IF @spId IS NULL
    BEGIN
        DECLARE @errMsg NVARCHAR(4000) = N'Mã sản phẩm không tồn tại: ' + @MaSanPham;
        THROW 50001, @errMsg, 1;
    END

    IF (@IsMain = 1)
        UPDATE dbo.SanPhamAnh
           SET is_main = 0
         WHERE san_pham_id = @spId
           AND is_main     = 1;

    INSERT dbo.SanPhamAnh (san_pham_id, image_url, public_id,
                           format, width, height, bytes, is_main)
    VALUES (@spId, @ImageUrl, @PublicId,
            @Format, @Width, @Height, @Bytes, @IsMain);
END
GO

