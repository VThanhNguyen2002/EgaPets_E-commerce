-- ─────────────────────────────────────────────────────────────────────────
-- INDEX
-- ─────────────────────────────────────────────────────────────────────────

USE EgaPets_DB;
GO

-- Nếu thường xuyên tìm kiếm user theo email hoặc role
CREATE NONCLUSTERED INDEX idx_Users_Email ON Users(email);
CREATE NONCLUSTERED INDEX idx_Users_Role ON Users(role);

-- Nếu thường xuyên tìm kiếm nhân viên hoặc khách hàng theo số điện thoại
CREATE NONCLUSTERED INDEX idx_NhanVien_SoDienThoai ON NhanVien(so_dien_thoai);
CREATE NONCLUSTERED INDEX idx_KhachHang_SoDienThoai ON KhachHang(so_dien_thoai);

-- Nếu thường xuyên tìm kiếm sản phẩm theo tên, thương hiệu, danh mục
CREATE NONCLUSTERED INDEX idx_SanPham_TenSanPham ON SanPham(ten_san_pham);
CREATE NONCLUSTERED INDEX idx_SanPham_ThuongHieu ON SanPham(thuong_hieu);
CREATE NONCLUSTERED INDEX idx_SanPham_DanhMuc ON SanPham(danh_muc_id);

-- Nếu thường xuyên tìm kiếm hóa đơn theo khach_hang_id, nhan_vien_id hoặc trang_thai
CREATE NONCLUSTERED INDEX idx_HoaDon_KhachHang ON HoaDon(khach_hang_id);
CREATE NONCLUSTERED INDEX idx_HoaDon_NhanVien ON HoaDon(nhan_vien_id);
CREATE NONCLUSTERED INDEX idx_HoaDon_TrangThai ON HoaDon(trang_thai);

-- Truy xuất các sản phẩm trong hóa đơn nhanh hơn.
CREATE NONCLUSTERED INDEX idx_ChiTietHoaDon_HoaDonID ON ChiTietHoaDon(hoa_don_id);
CREATE NONCLUSTERED INDEX idx_ChiTietHoaDon_SanPhamID ON ChiTietHoaDon(san_pham_id);

-- Lọc lịch hẹn theo khách hàng, nhân viên hoặc trạng thái nhanh hơn.
CREATE NONCLUSTERED INDEX idx_LichHen_KhachHang ON LichHen(khach_hang_id);
CREATE NONCLUSTERED INDEX idx_LichHen_NhanVien ON LichHen(nhan_vien_id);
CREATE NONCLUSTERED INDEX idx_LichHen_TrangThai ON LichHen(trang_thai);
GO

-- # Tạo index cho FaceIDLogs theo cột user_id
CREATE INDEX IX_FaceIDLogs_UserId
    ON FaceIDLogs(user_id);
GO

DROP INDEX IF EXISTS IX_FaceIDLogs_UserId ON FaceIDLogs;
GO

