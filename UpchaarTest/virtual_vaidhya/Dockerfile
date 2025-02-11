FROM python:3.11-slim AS base 
WORKDIR /app
COPY . . 
RUN pip install Flask==2.1.3 Flask_Cors==4.0.0 google-generativeai python-dotenv Werkzeug==2.2.2
CMD ["python3", "app.py"]
