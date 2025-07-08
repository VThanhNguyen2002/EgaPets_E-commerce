# EgaPets Deployment Guide

## 📋 Tổng quan

Hướng dẫn này sẽ giúp bạn deploy EgaPets lên các platform khác nhau với PostgreSQL database.

## 🗄️ Database Migration

### 1. Chuyển đổi từ SQL Server sang PostgreSQL

Các file PostgreSQL đã được tạo trong thư mục `Database/`:
- `EgaPets_PostgreSQL.sql` - Schema và tables
- `EgaPets_PostgreSQL_Data.sql` - Dữ liệu mẫu
- `EgaPets_PostgreSQL_Roles.sql` - Phân quyền và RLS
- `EgaPets_PostgreSQL_Functions.sql` - Functions
- `EgaPets_PostgreSQL_Triggers.sql` - Triggers

### 2. Setup Database Local

```bash
# Cài đặt PostgreSQL dependencies
cd my-backend
npm install pg

# Setup database
npm run db:setup

# Test database connection
npm run test:db

# Migration data từ SQL Server (optional)
npm run db:migrate
```

## 🚀 Deployment Options

### Option 1: Railway Deployment

#### Prerequisites
- Railway account
- PostgreSQL database trên Railway

#### Steps
1. **Tạo PostgreSQL database trên Railway:**
   ```bash
   railway add postgresql
   ```

2. **Set environment variables:**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set DATABASE_URL=${{Postgres.DATABASE_URL}}
   railway variables set JWT_SECRET=your_jwt_secret
   railway variables set FRONTEND_URL=https://your-app.railway.app
   ```

3. **Deploy:**
   ```bash
   railway up
   ```

#### Railway Configuration
- File: `railway.json`
- Dockerfile: `Dockerfile.railway`
- Port: Tự động detect từ `$PORT`

### Option 2: Vercel Deployment

#### Prerequisites
- Vercel account
- External PostgreSQL (Railway, Supabase, etc.)

#### Steps
1. **Setup PostgreSQL database externally**

2. **Configure environment variables trong Vercel:**
   ```
   NODE_ENV=production
   DB_HOST=your_postgres_host
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database
   DB_SSL=true
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://your-app.vercel.app
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

#### Vercel Configuration
- File: `vercel.json`
- Backend: Serverless functions
- Frontend: Static build

### Option 3: Docker Deployment

#### Local Development
```bash
# PostgreSQL stack
docker-compose -f docker-compose.postgresql.yml up -d

# Access:
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# Database: localhost:5432
```

#### Production
```bash
# Build production images
docker-compose -f docker-compose.postgresql.yml -f docker-compose.prod.yml up -d
```

## 🔧 Environment Variables

### Backend (.env)
```bash
# Server
PORT=5000
NODE_ENV=production

# PostgreSQL
DB_HOST=your_host
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=egapets_db
DB_SSL=true

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=https://your-frontend-url

# Mail
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USER=your_email
MAIL_PASS=your_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Face Recognition
FACE_SERVICE_URL=https://your-face-api-url
FACE_THRESHOLD=0.32
```

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url
VITE_FACE_API_URL=https://your-face-api-url
```

## 🧪 Testing

### Database Testing
```bash
# Test PostgreSQL connection
npm run test:db

# Test API endpoints
npm test

# Test with coverage
npm run test:coverage
```

### Load Testing
```bash
# Install artillery
npm install -g artillery

# Run load test
artillery quick --count 10 --num 5 https://your-api-url/api/health
```

## 📊 Monitoring

### Health Checks
- Backend: `GET /api/health`
- Database: `GET /api/db/health`
- Face API: `GET /face-api/health`

### Logs
- Railway: `railway logs`
- Vercel: Vercel dashboard
- Docker: `docker logs container_name`

## 🔒 Security Checklist

- [ ] Environment variables được set đúng
- [ ] JWT secret được generate random
- [ ] Database SSL enabled cho production
- [ ] CORS origins được configure đúng
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection protection
- [ ] XSS protection headers

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check connection
   npm run test:db
   
   # Verify environment variables
   echo $DATABASE_URL
   ```

2. **Migration Errors**
   ```bash
   # Reset database
   npm run db:setup
   
   # Check logs
   tail -f logs/error.log
   ```

3. **Build Failures**
   ```bash
   # Clear cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **CORS Errors**
   - Kiểm tra `FRONTEND_URL` trong backend
   - Kiểm tra `VITE_API_URL` trong frontend
   - Verify CORS origins configuration

## 📈 Performance Optimization

### Database
- Connection pooling enabled
- Indexes optimized
- Query optimization
- Row Level Security (RLS)

### Backend
- Compression middleware
- Rate limiting
- Caching strategies
- Error handling

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis

## 🔄 CI/CD Pipeline

### GitHub Actions (Recommended)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: railway-app/railway-action@v1
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}
```

## 📞 Support

Nếu gặp vấn đề trong quá trình deployment:
1. Kiểm tra logs
2. Verify environment variables
3. Test database connection
4. Check network connectivity
5. Review security settings

---

**Lưu ý:** Đảm bảo backup database trước khi deploy production!