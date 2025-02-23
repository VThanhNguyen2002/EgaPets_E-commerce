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

## Cài đặt & Chạy Backend với Docker

### 1️⃣ **Cài đặt `nodemon` trước khi build Docker**
Trước khi build Docker, bạn cần chạy lệnh sau trong thư mục `my-backend/`:
```sh
cd my-backend
npm install nodemon --save-dev
```
📌 **Lệnh này giúp backend tự động reload khi code thay đổi.**

### 2️⃣ **Chạy Docker Compose**
Sau khi cài đặt `nodemon`, quay lại thư mục gốc của dự án và chạy:
```sh
docker-compose up --build -d
```
📌 **Lệnh này sẽ:**
- Tự động build backend, frontend và database trong container Docker.
- Chạy backend tại `http://localhost:5000`.
- Yêu cầu máy bạn phải có **Docker Desktop** cài đặt sẵn.

### 3️⃣ **Kiểm tra Backend**
Sau khi Docker chạy xong, kiểm tra backend bằng cách truy cập:
```sh
http://localhost:5000
```
📌 **Nếu thấy phản hồi từ server, nghĩa là backend đã chạy thành công!** ✅

## Lưu ý
- **Yêu cầu cài đặt Docker Desktop trước khi chạy Docker Compose.**
- **Backend tự động reload khi sửa code, nhờ vào `nodemon` và `volumes` trong Docker.**


