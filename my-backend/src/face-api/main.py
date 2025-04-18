from flask import Flask, request, jsonify, abort
from deepface import DeepFace
from deepface.commons import distance as df_distance
import cv2, base64, numpy as np, os, jwt
from jwt import ExpiredSignatureError, InvalidTokenError

# Load biến môi trường
JWT_SECRET = os.environ.get("JWT_SECRET")
ALLOWED_ROLE = "NhanVien"

# Tạo thư mục tránh lỗi đa worker
os.makedirs("/root/.deepface", exist_ok=True)
os.makedirs("/root/.deepface/weights", exist_ok=True)

# Middleware kiểm tra token và role
def role_required(func):
    def wrapper(*args, **kwargs):
        raw = request.headers.get("Authorization", "")
        token = raw.replace("Bearer", "", 1).strip()

        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            if payload.get("role") != ALLOWED_ROLE:
                abort(403, description="Role not allowed")
        except ExpiredSignatureError:
            abort(401, description="Token expired")
        except InvalidTokenError as e:
            abort(401, description=f"Invalid token: {e}")
        return func(*args, **kwargs)
    return wrapper

# Load model DeepFace 1 lần
arcface_model = DeepFace.build_model("ArcFace")

# Flask app
app = Flask(__name__)

# Route: Trích xuất vector đặc trưng từ ảnh base64
@app.post("/extract-embedding")
@role_required
def extract_embedding():
    try:
        img_base64 = request.json.get("img_base64")
        if not img_base64:
            return jsonify({"error": "Missing img_base64"}), 400

        img_cv2 = decode_b64_to_cv2(img_base64)

        emb = DeepFace.represent(
            img_path=img_cv2,
            model_name="ArcFace",
            model=arcface_model,
            detector_backend="mtcnn"
        )[0]["embedding"]

        # Convert float32 -> bytes -> base64
        emb_b64 = base64.b64encode(
            np.asarray(emb, np.float32).tobytes()
        ).decode()

        return jsonify({"embedding_base64": emb_b64})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route: So sánh 2 ảnh base64
@app.route("/verify-face", methods=["POST"])
def verify_face():
    try:
        data = request.json
        img1_base64 = data.get("img1_base64")
        img2_base64 = data.get("img2_base64")

        if not img1_base64 or not img2_base64:
            return jsonify({"error": "Missing image(s)"}), 400

        img1_cv2 = decode_b64_to_cv2(img1_base64)
        img2_cv2 = decode_b64_to_cv2(img2_base64)

        result = DeepFace.verify(
            img1_cv2,
            img2_cv2,
            model_name="ArcFace",
            detector_backend="mtcnn",
            enforce_detection=True
        )

        return jsonify({
            "verified": result["verified"],
            "distance": result["distance"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Hàm tiện ích: Decode base64 ảnh thành ảnh OpenCV
def decode_b64_to_cv2(b64_str):
    b64_str += '=' * (-len(b64_str) % 4)  # Fix padding
    img_data = base64.b64decode(b64_str)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

# Chạy Flask app nếu cần (không dùng nếu chạy qua Gunicorn)
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)
