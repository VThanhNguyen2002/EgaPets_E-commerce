cd local-ai

venv\Scripts\activate


python main.py


uvicorn main:app --host 127.0.0.1 --port 8000 --reload

