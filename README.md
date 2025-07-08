# EgaPets - Website Thương Mại Điện Tử Bán Đồ Dùng Cho Chó & Mèo

## Giới Thiệu
EgaPets là một trang web thương mại điện tử chuyên cung cấp các sản phẩm dành cho thú cưng, đặc biệt là chó và mèo. Chúng tôi cung cấp đa dạng các mặt hàng như thức ăn, phụ kiện, dụng cụ chăm sóc sức khỏe và các sản phẩm khác nhằm mang đến trải nghiệm tốt nhất cho "Boss" của bạn!

## Tính Năng
- 🛒 Danh mục sản phẩm phong phú: Thức ăn, đồ chơi, phụ kiện...
- 🔎 Tìm kiếm sản phẩm nhanh chóng
- 🌐 Hỗ trợ ngôn ngữ đa dạng
- 📢 Khuyến mãi, Flash Sale hàng ngày
- 💳 Tích hợp các hình thức thanh toán online
- 📄 Blog chăm sóc thú cưng

## Cài Đặt & Chạy Dự Án

### Development (Local)
1. Clone repository:
   ```sh
   git clone https://github.com/VThanhNguyen2002/EgaPets_E-commerce.git
   cd EgaPets_E-commerce
   ```

2. Cài đặt dependencies:
   ```sh
   cd my-frontend && npm install
   cd ../my-backend && npm install
   ```

3. Setup Database (PostgreSQL):
   ```sh
   # Option 1: Docker (Recommended)
   docker-compose -f docker-compose.postgresql.yml up -d database
   
   # Option 2: Local PostgreSQL
   # Tạo database 'egapets_db' và chạy:
   cd my-backend
   npm run db:setup
   ```

4. Configure Environment:
   ```sh
   # Backend
   cp my-backend/.env.postgresql.example my-backend/.env
   # Cập nhật database credentials trong .env
   
   # Frontend
   cp my-frontend/.env.example my-frontend/.env
   ```

5. Chạy ứng dụng:
   ```sh
   # Backend
   cd my-backend && npm run dev
   
   # Frontend (terminal mới)
   cd my-frontend && npm run dev
   ```

### Production Deployment
Xem chi tiết trong [DEPLOYMENT.md](./DEPLOYMENT.md)

- **Railway**: `railway up`
- **Vercel**: `vercel --prod`
- **Docker**: `docker-compose -f docker-compose.postgresql.yml up -d`

---

# EgaPets - E-commerce Website for Pet Supplies

## Introduction
EgaPets is an e-commerce website specializing in pet products, especially for dogs and cats. We offer a wide variety of products including food, accessories, healthcare items, and more to ensure the best experience for your furry friends!

## Features
- 🛒 Diverse product categories: Food, toys, accessories...
- 🔎 Fast product search
- 🌐 Multi-language support
- 📢 Daily promotions and Flash Sales
- 💳 Secure online payment integration
- 📄 Pet care blog

## Installation & Running the Project

### Development Setup
1. Clone repository:
   ```sh
   git clone https://github.com/VThanhNguyen2002/EgaPets_E-commerce.git
   cd EgaPets_E-commerce
   ```

2. Install dependencies:
   ```sh
   cd my-frontend && npm install
   cd ../my-backend && npm install
   ```

3. Database Setup (PostgreSQL):
   ```sh
   # Using Docker (Recommended)
   docker-compose -f docker-compose.postgresql.yml up -d database
   
   # Setup database schema
   cd my-backend
   npm run db:setup
   npm run test:db  # Test connection
   ```

4. Environment Configuration:
   ```sh
   # Copy and configure environment files
   cp my-backend/.env.postgresql.example my-backend/.env
   cp my-frontend/.env.example my-frontend/.env
   ```

5. Run the application:
   ```sh
   # Backend
   cd my-backend && npm run dev
   
   # Frontend (new terminal)
   cd my-frontend && npm run dev
   ```

### Production Deployment
See detailed guide in [DEPLOYMENT.md](./DEPLOYMENT.md)

**Supported Platforms:**
- Railway (Full-stack with PostgreSQL)
- Vercel (Frontend + Serverless Backend)
- Docker (Self-hosted)

**Quick Deploy:**
```sh
# Railway
railway up

# Vercel
vercel --prod

# Docker
docker-compose -f docker-compose.postgresql.yml up -d
```

