USE EgaPets_DB;
GO

/* ────────────────────────────────────────────────
   📌 INDEX: Bảng Users
   ▪ Tối ưu tìm kiếm theo email, vai trò
   ──────────────────────────────────────────────── */
CREATE NONCLUSTERED INDEX idx_Users_Email ON Users(email);
CREATE NONCLUSTERED INDEX idx_Users_Role  ON Users(role);



/* ────────────────────────────────────────────────
   📌 INDEX: Bảng NhanVien & KhachHang
   ▪ Tìm kiếm theo số điện thoại
   ──────────────────────────────────────────────── */
CREATE NONCLUSTERED INDEX idx_NhanVien_SoDienThoai  ON NhanVien(so_dien_thoai);
CREATE NONCLUSTERED INDEX idx_KhachHang_SoDienThoai ON KhachHang(so_dien_thoai);



/* ────────────────────────────────────────────────
   📌 INDEX: Bảng SanPham
   ▪ Hỗ trợ tìm kiếm theo tên, thương hiệu, danh mục
   ──────────────────────────────────────────────── */
CREATE NONCLUSTERED INDEX idx_SanPham_TenSanPham  ON SanPham(ten_san_pham);
CREATE NONCLUSTERED INDEX idx_SanPham_ThuongHieu  ON SanPham(thuong_hieu);
CREATE NONCLUSTERED INDEX idx_SanPham_DanhMuc     ON SanPham(danh_muc_id);



/* ────────────────────────────────────────────────
   📌 INDEX: Bảng HoaDon
   ▪ Lọc hóa đơn theo khách hàng, nhân viên, trạng thái
   ──────────────────────────────────────────────── */
CREATE NONCLUSTERED INDEX idx_HoaDon_KhachHang  ON HoaDon(khach_hang_id);
CREATE NONCLUSTERED INDEX idx_HoaDon_NhanVien   ON HoaDon(nhan_vien_id);
CREATE NONCLUSTERED INDEX idx_HoaDon_TrangThai  ON HoaDon(trang_thai);



/* ────────────────────────────────────────────────
   📌 INDEX: Bảng ChiTietHoaDon
   ▪ Tối ưu join từ hóa đơn → chi tiết
   ──────────────────────────────────────────────── */
CREATE NONCLUSTERED INDEX idx_ChiTietHoaDon_HoaDonID   ON ChiTietHoaDon(hoa_don_id);
CREATE NONCLUSTERED INDEX idx_ChiTietHoaDon_SanPhamID  ON ChiTietHoaDon(san_pham_id);



/* ────────────────────────────────────────────────
   📌 INDEX: Bảng LichHen
   ▪ Tối ưu lọc theo khách hàng, nhân viên, trạng thái
   ──────────────────────────────────────────────── */
CREATE NONCLUSTERED INDEX idx_LichHen_KhachHang  ON LichHen(khach_hang_id);
CREATE NONCLUSTERED INDEX idx_LichHen_NhanVien   ON LichHen(nhan_vien_id);
CREATE NONCLUSTERED INDEX idx_LichHen_TrangThai  ON LichHen(trang_thai);



/* ────────────────────────────────────────────────
   📌 INDEX: Bảng FaceIDLogs
   ▪ Hỗ trợ truy xuất lịch sử xác thực theo user
   ──────────────────────────────────────────────── */
DROP INDEX IF EXISTS IX_FaceIDLogs_UserId ON FaceIDLogs;
CREATE NONCLUSTERED INDEX IX_FaceIDLogs_UserId ON FaceIDLogs(user_id);



/* ────────────────────────────────────────────────
   📌 INDEX: Bảng GioHang
   ▪ Tránh trùng dữ liệu → UNIQUE (khách hoặc guest)
   ──────────────────────────────────────────────── */
CREATE UNIQUE INDEX UQ_Cart_Customer
ON GioHang(khach_hang_id, san_pham_id)
WHERE khach_hang_id IS NOT NULL;

CREATE UNIQUE INDEX UQ_Cart_Guest
ON GioHang(session_id, san_pham_id)
WHERE session_id IS NOT NULL;



/* ────────────────────────────────────────────────
   📌 INDEX: Bảng SanPhamAnh
   ▪ Tăng tốc gallery ảnh theo sản phẩm
   ──────────────────────────────────────────────── */
CREATE NONCLUSTERED INDEX IX_SanPhamAnh_SanPham
ON SanPhamAnh(san_pham_id, uploaded_at DESC);
GO
