# README - Backend (Node.js + Express + SQL Server)

## Giới thiệu

Backend của EgaPets được xây dựng bằng **Node.js** và **Express**. Hệ thống quản lý dữ liệu thông qua **SQL Server** với **Sequelize ORM** để dễ dàng thao tác.

## Công nghệ & Thư viện sử dụng

- 🌐 **Node.js + Express.js** - Xây dựng API backend
- 🛢 **SQL Server + Sequelize** - Quản lý cơ sở dữ liệu quan hệ
- 🔑 **JSON Web Token (JWT)** - Xác thực người dùng
- 🔒 **bcryptjs** - Mã hóa mật khẩu
- 📞 **Cors** - Hỗ trợ giao tiếp giữa frontend và backend
- 📄 **Dotenv** - Quản lý biến môi trường

## Cài đặt & Chạy Backend

1. Cài đặt dependencies:
   ```sh
   cd my-backend
   npm install
   ```
2. Cấu hình cơ sở dữ liệu:
   - Tạo file `.env` trong `my-backend/` với nội dung:
   ```env
   PORT=5000
   DB_HOST=your_sql_server_host
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_secret_key
   ```
3. Chạy migration & seed database:
   ```sh
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```
4. Chạy server backend:
   ```sh
   node server.js
   ```
5. API server chạy tại:
   ```
   http://localhost:5000
   ```

