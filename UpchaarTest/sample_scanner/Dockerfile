FROM python:3.9-slim

RUN apt update && apt install -y \
    tesseract-ocr \
    libtesseract-dev \
    libgl1-mesa-dev

WORKDIR /app

COPY . .

RUN python3 -m venv venv
RUN . venv/bin/activate && pip install \
    Flask==2.1.3 \
    Werkzeug==2.0.1 \
    requests \
    opencv-python \
    pytesseract \
    markdown

EXPOSE 5050

CMD ["./venv/bin/python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=5050"]