from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from parser import parse_chat
from analyzer import analyze_chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile):

    content = await file.read()

    chat_text = content.decode("utf-8")

    messages = parse_chat(chat_text)

    stats = analyze_chat(messages)

    return {
    **stats,

    "loveScore": 0,

    "youResponseTime": "0",
    "partnerResponseTime": "0",

    "youStartsChat": 0,
    "partnerStartsChat": 0,

    "mostActiveTime": "Unknown",

    "radarData": [],

    "achievements": [],

    "greenFlags": [],

    "redFlags": [],

    "mostRomanticMsg": {
        "text": "",
        "date": ""
    },
}