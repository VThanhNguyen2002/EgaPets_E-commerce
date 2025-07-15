# EgaPets Database Setup Guide

## 📋 Tổng quan

File `complete-database-with-data.sql` chứa toàn bộ cấu trúc database và dữ liệu mẫu cho hệ thống EgaPets.

## 🗂️ Cấu trúc Database

### Bảng chính:
- **Users**: Quản lý tài khoản người dùng (Admin, NhanVien, KhachHang)
- **KhachHang**: Thông tin khách hàng
- **NhanVien**: Thông tin nhân viên
- **DanhMucSanPham** / **danh_muc_san_pham**: Danh mục sản phẩm (2 bảng tương tự)
- **SanPham** / **san_pham**: Sản phẩm (2 bảng tương tự)
- **DichVu**: Dịch vụ
- **DichVuChiTiet**: Chi tiết giá dịch vụ theo cân nặng và loại lông
- **GioHang**: Giỏ hàng
- **HoaDon**: Hóa đơn
- **ChiTietHoaDon**: Chi tiết hóa đơn
- **LichHen**: Lịch hẹn dịch vụ
- **PhuongThucThanhToan**: Phương thức thanh toán
- **FaceID** / **FaceIDLogs**: Hệ thống nhận diện khuôn mặt

## 📊 Dữ liệu mẫu có sẵn

### Tài khoản người dùng:
- **Admin**: `admin` / `admin123`
- **Nhân viên**: `nhanvien1` / `nv123456`
- **Khách hàng**: `demo1` / `123456`

### Sản phẩm:
- 5 sản phẩm trong bảng `SanPham`
- 8 sản phẩm trong bảng `san_pham`
- Các danh mục: Thức ăn cho chó, mèo, đồ chơi, phụ kiện, thuốc, vệ sinh

### Dịch vụ:
- 5 loại dịch vụ: Tắm rửa, cắt tỉa lông, khám sức khỏe, tiêm phòng, spa
- 20 mức giá chi tiết theo cân nặng và loại lông

### Phương thức thanh toán:
- Tiền mặt, chuyển khoản, thẻ tín dụng, ví điện tử

## 🚀 Cách sử dụng

### 1. Trên Railway/PostgreSQL Cloud:
```bash
# Upload file complete-database-with-data.sql lên Railway
# Hoặc copy nội dung và paste vào Query Editor
```

### 2. Trên PostgreSQL local:
```bash
psql -U username -d database_name -f complete-database-with-data.sql
```

### 3. Sử dụng pgAdmin:
1. Mở pgAdmin
2. Kết nối đến database
3. Mở Query Tool
4. Load file `complete-database-with-data.sql`
5. Execute

## ⚠️ Lưu ý quan trọng

### Bảng trùng lặp:
Hệ thống có một số bảng trùng lặp do quá trình phát triển:
- `DanhMucSanPham` vs `danh_muc_san_pham`
- `SanPham` vs `san_pham`
- `KhachHang` vs `khach_hang` (nếu có)

### Khuyến nghị:
1. **Sử dụng bảng mới** (snake_case): `danh_muc_san_pham`, `san_pham`
2. **Migrate dữ liệu** từ bảng cũ sang bảng mới
3. **Xóa bảng cũ** sau khi đã migrate xong

## 🔧 Kiểm tra sau khi setup

```sql
-- Kiểm tra số lượng bản ghi
SELECT 
    'Users' as table_name, COUNT(*) as count FROM Users
UNION ALL
SELECT 'KhachHang', COUNT(*) FROM KhachHang
UNION ALL
SELECT 'SanPham', COUNT(*) FROM SanPham
UNION ALL
SELECT 'san_pham', COUNT(*) FROM san_pham
UNION ALL
SELECT 'DichVu', COUNT(*) FROM DichVu
UNION ALL
SELECT 'DichVuChiTiet', COUNT(*) FROM DichVuChiTiet;
```

## 📞 Hỗ trợ

Nếu gặp lỗi trong quá trình setup:
1. Kiểm tra phiên bản PostgreSQL (khuyến nghị >= 12)
2. Đảm bảo có quyền CREATE TABLE, INDEX
3. Kiểm tra extension `uuid-ossp` và `pgcrypto` đã được enable

---

**Tạo bởi**: EgaPets Development Team  
**Ngày cập nhật**: $(date)  
**Phiên bản**: 1.0