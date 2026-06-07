import re

def parse_chat(file_path):

    with open(file_path, "r", encoding="utf-8") as f:
        chat_text = f.read()

    messages = []

    pattern = r"(\d{1,2}/\d{1,2}/\d{2,4}),\s(.+?)\s-\s(.*?):\s(.*)"

    lines = chat_text.split("\n")

    for line in lines:

        match = re.match(pattern, line)

        if match:

            messages.append({
                "date": match.group(1),
                "time": match.group(2),
                "sender": match.group(3),
                "message": match.group(4)
            })

    return messages