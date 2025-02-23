# Sử dụng Node.js image
FROM node:18-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép và cài đặt dependencies
COPY package.json ./
RUN npm install

# Sao chép toàn bộ code
COPY . .

# Mở port cho Vite
EXPOSE 5173

# Chạy frontend bằng Vite
CMD ["npm", "run", "dev"]
