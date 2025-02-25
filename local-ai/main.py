from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/scan/")
def scan_code(folder_path: str):
    """Quét folder, trả về danh sách file + số dòng code của từng file"""
    if not os.path.exists(folder_path):
        return {"error": "Folder không tồn tại!"}

    files_info = []
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(('.js', '.ts', '.tsx', '.css')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        lines = f.readlines()
                    files_info.append({
                        "file_name": file,
                        "path": file_path,
                        "lines_count": len(lines)
                    })
                except Exception as e:
                    files_info.append({
                        "file_name": file,
                        "path": file_path,
                        "error": f"Không thể đọc file: {str(e)}"
                    })

    return {"total_files": len(files_info), "files": files_info}

@app.get("/file/")
def get_file_content(file_path: str):
    """Lấy nội dung của 1 file cụ thể (trả về dưới dạng JSON đẹp)"""
    if not os.path.exists(file_path):
        return {"error": "File không tồn tại!"}

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Trả về JSON với nội dung file dễ đọc hơn
        return {
            "file_path": file_path,
            "content": content.split("\n")  # Mỗi dòng là một phần tử trong danh sách
        }
    except Exception as e:
        return {"error": f"Không thể đọc file: {str(e)}"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
