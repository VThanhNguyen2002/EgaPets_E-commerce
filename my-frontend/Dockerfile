# Sử dụng Node.js image
FROM node:18-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Sao chép toàn bộ code
COPY . .

# Build React App
RUN npm run build

# Sử dụng Nginx để chạy frontend
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Mở port 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
