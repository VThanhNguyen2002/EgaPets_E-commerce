# Sử dụng Node.js image
FROM node:18-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Sao chép toàn bộ code vào container
COPY . .

# Mở port 5000
EXPOSE 5000

# Chạy server
CMD ["node", "server.js"]
