# 🚨 Railway Deployment Troubleshooting Guide

## ❌ Vấn đề hiện tại: Deploy Failed

### 🔍 Chẩn đoán ban đầu
Dựa trên việc kiểm tra code và test kết nối, các vấn đề có thể gặp phải:

1. **Database Connection Issues** ❌
   - Lỗi `read ECONNRESET` khi kết nối PostgreSQL
   - Có thể do thông tin database đã thay đổi
   - Railway database service có thể đang restart

2. **Environment Variables** ⚠️
   - Cần kiểm tra lại các biến môi trường trên Railway
   - Database credentials có thể đã được cập nhật

## 🛠️ Giải pháp từng bước

### Bước 1: Kiểm tra Railway Database Status

1. **Đăng nhập Railway Dashboard**
   - Truy cập: https://railway.app/dashboard
   - Chọn project EgaPets

2. **Kiểm tra PostgreSQL Service**
   - Click vào PostgreSQL service
   - Xem tab "Connect" để lấy thông tin kết nối mới nhất
   - Kiểm tra status: phải là "Active" (màu xanh)

3. **Lấy thông tin kết nối mới**
   ```
   PGHOST=<new_host>
   PGPORT=<new_port>
   PGDATABASE=railway
   PGUSER=postgres
   PGPASSWORD=<new_password>
   ```

### Bước 2: Cập nhật Environment Variables

1. **Trong Railway Dashboard**
   - Chọn backend service (my-backend)
   - Vào tab "Variables"
   - Cập nhật các biến sau:

   ```bash
   DB_HOST=<host_from_step_1>
   DB_PORT=<port_from_step_1>
   DB_USER=postgres
   DB_PASSWORD=<password_from_step_1>
   DB_NAME=railway
   DB_SSL=true
   PORT=3000
   NODE_ENV=production
   HOST=0.0.0.0
   ```

### Bước 3: Cập nhật Code với thông tin mới

1. **Cập nhật file cấu hình**
   ```bash
   # Chạy script này để cập nhật với thông tin database mới
   node update-railway-config.js
   ```

2. **Test kết nối local** (optional)
   ```bash
   # Set environment variables tạm thời
   set DB_HOST=<new_host>
   set DB_PORT=<new_port>
   set DB_PASSWORD=<new_password>
   
   # Test connection
   node test-railway-connection.js
   ```

### Bước 4: Deploy lại

1. **Commit changes**
   ```bash
   git add .
   git commit -m "Fix: Update Railway database configuration"
   git push origin main
   ```

2. **Trigger redeploy trên Railway**
   - Railway sẽ tự động deploy khi có push mới
   - Hoặc click "Deploy" manually trong dashboard

### Bước 5: Kiểm tra Deploy Logs

1. **Xem Deploy Logs**
   - Trong Railway dashboard > backend service > "Deployments"
   - Click vào deployment mới nhất
   - Xem "Build Logs" và "Deploy Logs"

2. **Tìm các thông báo quan trọng**
   ```
   ✅ Tốt: "Server is listening on all interfaces"
   ✅ Tốt: "Database setup completed"
   ✅ Tốt: "PostgreSQL Database Connected"
   
   ❌ Lỗi: "Connection failed"
   ❌ Lỗi: "ECONNRESET"
   ❌ Lỗi: "Authentication failed"
   ```

### Bước 6: Test Health Check

1. **Sau khi deploy thành công**
   ```
   https://your-app-name.railway.app/health
   ```

2. **Kết quả mong đợi**
   ```json
   {
     "status": "UP",
     "db": true,
     "timestamp": "2024-01-XX...",
     "environment": "production"
   }
   ```

## 🔧 Các vấn đề thường gặp và cách fix

### 1. Database Connection Timeout
**Triệu chứng:** `connection timeout` hoặc `ECONNRESET`

**Giải pháp:**
- Kiểm tra Railway database service có đang chạy không
- Restart PostgreSQL service trên Railway
- Kiểm tra lại host/port/password

### 2. Authentication Failed
**Triệu chứng:** `password authentication failed`

**Giải pháp:**
- Lấy password mới từ Railway dashboard
- Cập nhật environment variable `DB_PASSWORD`

### 3. SSL Connection Issues
**Triệu chứng:** `SSL connection error`

**Giải pháp:**
- Đảm bảo `DB_SSL=true`
- Kiểm tra cấu hình SSL trong code: `{ rejectUnauthorized: false }`

### 4. Health Check Failed
**Triệu chứng:** Railway báo "Health check failed"

**Giải pháp:**
- Kiểm tra endpoint `/health` có hoạt động không
- Xem logs để tìm lỗi cụ thể
- Tăng `healthcheckTimeout` trong `railway.json`

### 5. Build Failed
**Triệu chứng:** "Build failed" trong deploy logs

**Giải pháp:**
- Kiểm tra `package.json` có đúng dependencies không
- Xem build logs để tìm lỗi cụ thể
- Đảm bảo `Dockerfile.railway` đúng cú pháp

## 📋 Checklist cuối cùng

Trước khi deploy, đảm bảo:

- [ ] Railway PostgreSQL service đang chạy (status: Active)
- [ ] Environment variables đã được cập nhật với thông tin mới nhất
- [ ] Code đã được commit và push
- [ ] `railway.json` có cấu hình đúng
- [ ] `Dockerfile.railway` không có lỗi syntax
- [ ] Health check endpoint `/health` hoạt động

## 🆘 Nếu vẫn không được

1. **Kiểm tra Railway Status Page**
   - https://status.railway.app/
   - Xem có sự cố hệ thống không

2. **Tạo database service mới**
   - Backup dữ liệu hiện tại
   - Tạo PostgreSQL service mới
   - Cập nhật connection string

3. **Liên hệ Railway Support**
   - Discord: https://discord.gg/railway
   - Cung cấp project ID và error logs

## 📞 Thông tin hỗ trợ

- **Railway Docs:** https://docs.railway.app/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Node.js pg module:** https://node-postgres.com/

---

**Lưu ý:** Thông tin database credentials có thể thay đổi khi Railway restart services. Luôn kiểm tra thông tin mới nhất từ Railway dashboard trước khi deploy.