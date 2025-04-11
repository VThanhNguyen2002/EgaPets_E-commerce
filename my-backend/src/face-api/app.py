# app.py
from flask import Flask, request, jsonify
from deepface import DeepFace
from deepface.commons import distance as df_distance
import cv2, base64, numpy as np

# Load model ArcFace 1 lần
arcface_model = DeepFace.build_model("ArcFace")

app = Flask(__name__)

@app.route('/extract-embedding', methods=['POST'])
def extract_embedding():
    data = request.json
    img_b64 = data["img_base64"]
    img_cv2 = decode_b64_to_cv2(img_b64)

    # represent => enforce_detection=True, detector_backend="mtcnn"
    # => MTCNN detect & crop
    emb = DeepFace.represent(
        img_path=img_cv2,
        model_name="ArcFace",
        model=arcface_model,
        enforce_detection=True,
        detector_backend="mtcnn"  # thay vì default 'opencv'
    )
    # emb là list, each item: {"embedding": [...], ...}
    embedding_vec = emb[0]["embedding"]

    return jsonify({"embedding": embedding_vec})


@app.route('/verify-face', methods=['POST'])
def verify_face():
    data = request.json
    img1_cv2 = decode_b64_to_cv2(data["img1_base64"])
    img2_cv2 = decode_b64_to_cv2(data["img2_base64"])

    # Gọi verify => MTCNN
    # Hoặc TỰ represent + compare (nếu bạn muốn full control)
    # Ở đây minh họa verify() built-in
    # => Thêm param: detector_backend="mtcnn"
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

def decode_b64_to_cv2(b64_str):
    # fix padding
    b64_str += '=' * (-len(b64_str) % 4)
    img_data = base64.b64decode(b64_str)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
