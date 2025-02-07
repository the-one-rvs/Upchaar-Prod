from flask import Flask, request, jsonify
from flask_cors import CORS
from model import Answer

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def demo():
    return "Virtual Vaidhya server is working well 😊 !"

@app.route('/ask', methods=['GET'])
def ask_question():
    user_question = request.args.get('question', default='', type=str)
    response = Answer(user_question)
    print(response)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')

