USE EgaPets_DB;
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

