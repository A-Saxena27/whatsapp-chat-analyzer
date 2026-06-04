import re

def parse_chat(chat_text):
    messages = []

    pattern = r"(\d{1,2}/\d{1,2}/\d{2,4}),\s(.+?)\s-\s(.*?):\s(.*)"

    lines = chat_text.split("\n")

    for line in lines:
        match = re.match(pattern, line)

        if match:
            date = match.group(1)
            time = match.group(2)
            sender = match.group(3)
            message = match.group(4)

            messages.append({
                "date": date,
                "time": time,
                "sender": sender,
                "message": message
            })

    return messages