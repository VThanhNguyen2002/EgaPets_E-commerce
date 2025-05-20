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


/*─────────────────────────────────────*
*  PROC  :  cập-nhật profile khách     *
*──────────────────────────────────────*/
CREATE OR ALTER PROCEDURE usp_UpdateCustomerProfile
  @KhId INT,
  @HoTen NVARCHAR(255)=NULL,
  @Phone NVARCHAR(15)=NULL,
  @DiaChi NVARCHAR(255)=NULL,
  @Tinh   NVARCHAR(100)=NULL,
  @Huyen  NVARCHAR(100)=NULL,
  @Xa     NVARCHAR(100)=NULL
AS
BEGIN
  UPDATE KhachHang SET
    ho_ten        = ISNULL(@HoTen, ho_ten),
    so_dien_thoai = ISNULL(@Phone, so_dien_thoai),
    dia_chi       = ISNULL(@DiaChi, dia_chi),
    tinh_thanh    = ISNULL(@Tinh, tinh_thanh),
    quan_huyen    = ISNULL(@Huyen, quan_huyen),
    phuong_xa     = ISNULL(@Xa, phuong_xa)
  WHERE id = @KhId;
END



