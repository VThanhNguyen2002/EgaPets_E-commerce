from flask import Flask, request, jsonify
from deepface import DeepFace
from deepface.commons import distance as df_distance
import base64
import cv2
import numpy as np

# 1) Load model ArcFace một lần, hạn chế reload
arcface_model = DeepFace.build_model("ArcFace")

app = Flask(__name__)

@app.route('/verify-face', methods=['POST'])
def verify_face():
    data = request.json
    img1 = decode_base64_to_cv2(data["img1_base64"])
    img2 = decode_base64_to_cv2(data["img2_base64"])

    # 2) Trích xuất embedding
    emb1 = DeepFace.represent(
        img_path = img1, 
        model_name = "ArcFace",
        model = arcface_model,         # Dùng model đã load
        enforce_detection = False
    )
    emb2 = DeepFace.represent(
        img_path = img2, 
        model_name = "ArcFace",
        model = arcface_model,
        enforce_detection = False
    )

    # Mỗi hàm represent() trả về list: [{'embedding': [...512 values...], ...}, ...]
    # Ta lấy embedding từ phần tử đầu tiên
    vec1 = emb1[0]['embedding']
    vec2 = emb2[0]['embedding']

    # 3) Tính khoảng cách Cosine
    dist = df_distance.findCosineDistance(vec1, vec2)
    # Hoặc df_distance.findEuclideanDistance(vec1, vec2) nếu bạn thích

    # 4) So sánh threshold
    threshold = 0.4
    verified = (dist < threshold)

    return jsonify({
        "distance": float(dist),
        "verified": bool(verified)
    })


def decode_base64_to_cv2(b64_str):
    b64_str += '=' * (-len(b64_str) % 4)  # fix padding
    img_data = base64.b64decode(b64_str)
    np_arr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
