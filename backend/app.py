from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

from parser import parse_chat
from analyzer import analyze_chat

@app.route("/")
def home():
    return {
        "status": "running"
    }

@app.route("/analyze", methods=["POST"])
def analyze():

    try:

        print("REQUEST RECEIVED")

        file = request.files["file"]

        print("FILE:", file.filename)

        file_path = "uploaded_chat.txt"
        file.save(file_path)

        print("FILE SAVED")

        messages = parse_chat(file_path)

        print("MESSAGES:", len(messages))

        result = analyze_chat(messages)

        os.remove(file_path)

        print("RESULT:", result)

        return jsonify(result)

    except Exception as e:

        print("ERROR:", str(e))

        import traceback
        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500