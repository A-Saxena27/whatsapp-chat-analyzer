from flask import Flask, request, jsonify
from flask_cors import CORS

from parser import parse_chat
from analyzer import analyze_chat

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "status": "running",
        "message": "WhatsApp Chat Analyzer API"
    })


@app.route("/analyze", methods=["POST"])
def analyze():

    file = request.files["file"]

    file_path = "uploaded_chat.txt"
    file.save(file_path)

    messages = parse_chat(file_path)

    result = analyze_chat(messages)

    print(result)

    return jsonify(result)

    if "file" not in request.files:
        return jsonify({
            "success": False,
            "error": "No file uploaded"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "success": False,
            "error": "No file selected"
        }), 400

    try:
        filepath = "uploaded_chat.txt"
        file.save(filepath)

        messages = parse_chat(filepath)

        result = analyze_chat(messages)

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )