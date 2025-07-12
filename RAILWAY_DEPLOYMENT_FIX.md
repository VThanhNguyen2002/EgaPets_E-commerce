# Khắc Phục Lỗi 502 Bad Gateway trên Railway

## 🔍 Nguyên Nhân

Lỗi 502 Bad Gateway xảy ra vì:
1. **Mismatch Database**: Code sử dụng SQL Server (mssql) nhưng Railway cấu hình PostgreSQL
2. **Database Connection Failed**: Ứng dụng không thể kết nối đến PostgreSQL database
3. **Missing Database Schema**: Database chưa được setup với tables cần thiết

## ✅ Giải Pháp Đã Thực Hiện

### 1. Chuyển đổi Database từ SQL Server sang PostgreSQL
- ✅ Cập nhật `my-backend/src/shared/db/sql.js` để sử dụng PostgreSQL
- ✅ Thay thế `mssql` package bằng `pg` (PostgreSQL)
- ✅ Cập nhật health check endpoint
- ✅ Tạo script setup database cho Railway

### 2. Cập nhật Deployment Configuration
- ✅ Tạo `start-railway.sh` script để setup database trước khi start server
- ✅ Cập nhật `Dockerfile.railway` để sử dụng startup script
- ✅ Thêm script `db:setup-railway` trong package.json

### 3. Files Đã Được Tạo/Cập Nhật
```
my-backend/
├── src/shared/db/
│   ├── sql.js (updated - PostgreSQL)
│   └── postgresql.js (new)
├── scripts/
│   └── setup-railway-db.js (new)
├── start-railway.sh (new)
└── package.json (updated)

Dockerfile.railway (updated)
```

## 🚀 Cách Deploy Lại

### Bước 1: Commit và Push Changes
```bash
git add .
git commit -m "Fix: Convert from SQL Server to PostgreSQL for Railway deployment"
git push origin main
```

### Bước 2: Trigger Railway Redeploy
1. Vào Railway Dashboard
2. Chọn project EgaPets_E-commerce
3. Click "Deploy" hoặc "Redeploy"
4. Hoặc push một commit mới để trigger auto-deploy

### Bước 3: Kiểm Tra Deployment
1. **Xem Build Logs**: Kiểm tra quá trình build có thành công không
2. **Xem Deploy Logs**: Tìm các message:
   - `🚀 Starting EgaPets on Railway...`
   - `🔧 Setting up database...`
   - `✅ Database setup completed`
   - `🎯 Starting application server...`
   - `✅ PostgreSQL Database Connected`

### Bước 4: Test Application
1. Truy cập domain: `https://egapetse-commerce-production-3f85.up.railway.app`
2. Kiểm tra health endpoint: `/health`
3. Test API endpoints: `/api/...`

## 🔧 Troubleshooting

### Nếu vẫn gặp lỗi 502:

1. **Kiểm tra Environment Variables**:
   ```
   DB_HOST=yamanote.proxy.rlwy.net
   DB_PORT=30023
   DB_USER=postgres
   DB_PASSWORD=sUrpZPCLOiGvsUmiBONyCmkyfygjiPTM
   DB_NAME=railway
   DB_SSL=true
   PORT=3000
   ```

2. **Kiểm tra Database Connection**:
   - Vào Railway Dashboard > Database
   - Kiểm tra database có đang chạy không
   - Test connection string

3. **Xem Detailed Logs**:
   ```bash
   # Nếu có Railway CLI
   railway logs
   ```

### Nếu Database Setup Fails:

1. **Manual Database Setup**:
   - Connect trực tiếp đến Railway PostgreSQL
   - Chạy file `Database/EgaPets_PostgreSQL.sql`
   - Import data từ `Database/EgaPets_PostgreSQL_Data.sql`

2. **Alternative: Local Migration**:
   ```bash
   # Từ local machine
   cd my-backend
   npm run db:setup-railway
   ```

## 📊 Kiểm Tra Thành Công

Khi deployment thành công, bạn sẽ thấy:
- ✅ Website load được (không còn 502)
- ✅ Health check trả về `{"status": "UP", "db": true}`
- ✅ API endpoints hoạt động bình thường
- ✅ Database queries thành công

## 🆘 Nếu Cần Hỗ Trợ

Nếu vẫn gặp vấn đề, hãy cung cấp:
1. Screenshot của Railway deployment logs
2. Error messages cụ thể
3. Kết quả của health check endpoint
4. Database connection status từ Railway dashboard

---

**Lưu ý**: Thay đổi này chuyển toàn bộ backend từ SQL Server sang PostgreSQL. Đảm bảo rằng tất cả data quan trọng đã được backup trước khi deploy.