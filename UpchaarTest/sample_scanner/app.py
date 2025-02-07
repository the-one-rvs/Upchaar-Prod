from flask import Flask, render_template, request, jsonify
import requests
import cv2 as cv
import pytesseract
import json
import os
import markdown


app = Flask(__name__)


@app.route('/')
def reg():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return "No file part in the request", 400
    f = request.files['file']
    if f.filename == '':
        return "No selected file", 400
    
    file_path = os.path.join('uploads', f.filename)
    f.save(file_path)
    
    img = cv.imread(file_path)
    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    s = pytesseract.image_to_string(img)
    print (s)

    link = os.getenv('Virtual_Vaidhya_Link')
    virtual_vaidhya_url = f"{link}/ask"
    response = requests.get(virtual_vaidhya_url, params={"question": s})

    print (type(response))

    fetched_response = response.json()
    fetched_response_str = json.dumps(fetched_response).replace("\\n", "<br>")
    print (type(fetched_response_str))
    str_gain = fetched_response_str
    str_gain = str_gain[14:]
    str_gain = str_gain[:-2]
    html = markdown.markdown(str_gain)

    print (html)

    return render_template('result.html', response=html)


if __name__ =='__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True, port=5050)
