
# 🧠 Face Verification API with DeepFace (Dockerized)

## 📌 Mô tả
Đây là một REST API đơn giản dùng để **xác thực khuôn mặt (face verification)** bằng thư viện [DeepFace](https://github.com/serengil/deepface), được xây dựng với `Flask` và đóng gói bằng `Docker`.

API nhận vào hai ảnh base64 và trả về khoảng cách giữa embedding và kết quả xác thực (true/false).

## 🚀 Công nghệ sử dụng
- `Flask`: Python web framework
- `DeepFace`: Xử lý nhận diện khuôn mặt
- `OpenCV`: Xử lý ảnh
- `Docker`: Đóng gói và triển khai
- `ArcFace`: Model nhận diện dùng trong DeepFace

---

## 🧪 API Endpoint

### `POST /verify-face`

**Request:**
```json
{
  "img1_base64": "<base64-encoded-image-1>",
  "img2_base64": "<base64-encoded-image-2>"
}
```

**Response:**
```json
{
  "distance": 0.25,
  "verified": true
}
```

> `distance`: khoảng cách cosine giữa hai ảnh  
> `verified`: true nếu giống nhau, false nếu khác

---

## 🐳 Cách build và run bằng Docker

### 1. Build image
```bash
docker build -t deepface-flask .
```

### 2. Chạy container
```bash
docker run -d -p 5000:5000 --name face-api deepface-flask
```

### 3. Test API bằng Postman
Gửi `POST` đến:  
```
http://localhost:5000/verify-face
```

> Gợi ý: Dùng trang web như [base64-image.de](https://www.base64-image.de/) để convert ảnh JPG/PNG thành chuỗi base64.

---

## 📁 Cấu trúc thư mục
```
face-api/
├── Dockerfile
├── requirements.txt
└── server.py
```

---

## 🧠 Cách hoạt động

1. Khi khởi động, model `ArcFace` được load 1 lần và cache trong RAM.
2. Mỗi request `POST /verify-face`:
   - Decode ảnh base64 sang `cv2 image`.
   - Trích xuất embedding bằng `DeepFace.represent`.
   - Tính khoảng cách cosine giữa 2 embedding.
   - Trả về JSON kết quả `distance` và `verified`.

---

## 🧩 File tham khảo

### `server.py`
```python
result = DeepFace.represent(img_path=img, model_name="ArcFace", model=arcface_model)
distance = df_distance.findCosineDistance(vec1, vec2)
```

---

## 📦 `requirements.txt`
```txt
deepface==0.0.78
Flask==2.2.5
opencv-python-headless
tensorflow==2.9.1
numpy==1.23.5
```

---

## 📌 Ghi chú
- Dùng `ArcFace` cho độ chính xác cao.
- Chạy trên Docker giúp triển khai dễ dàng, không phụ thuộc máy host.
- Có thể mở rộng thêm `compare_faces`, `detect_face`, `verify_face_batch`,...

---

## 🧑‍💻 Tác giả
Built with ❤️ by DevOps & Fullstack 🧠 EgaPets project
