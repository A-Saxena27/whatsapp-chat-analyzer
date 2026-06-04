from pyexpat.errors import messages
import re

def analyze_chat(messages):

    total_messages = len(messages)

    total_words = sum(
        len(msg["message"].split())
        for msg in messages
    )

    total_links = sum(
        len(re.findall(r"https?://\S+", msg["message"]))
        for msg in messages
    )

    total_media = sum(
        1
        for msg in messages
        if "<Media omitted>" in msg["message"]
    )
    participants = get_participants(messages)
    participants = sorted(
        participants.items(),
        key=lambda x: x[1],
        reverse=True
    )
    partner = participants[1][0] if len(participants) > 1 else "Unknown"

    favorite_emoji, emoji_count = get_emoji_stats(messages)

    monthly_data = get_monthly_data(messages)

    peak_month = get_peak_month(monthly_data)

    return {
        "totalMessages": total_messages,
        "totalWords": total_words,
        "totalLinks": total_links,
        "totalMedia": total_media,
        "partner": partner,
        "favoriteEmoji": favorite_emoji,
        "favoriteEmojiCount": emoji_count,
        "totalEmoji": emoji_count,
        "topWords": get_top_words(messages),
        "monthlyData": monthly_data,
        "peakMonth": peak_month,
        "loveScore": 0,
        "radarData": [],
        "greenFlags": [],
        "redFlags": [],
        "achievements": [],
        "mostActiveTime": "",
        "youResponseTime": "0",
        "partnerResponseTime": "0",
    }


from collections import Counter

def get_participants(messages):
    senders = [msg["sender"] for msg in messages]

    counts = Counter(senders)

    return counts

from collections import Counter
import emoji

def get_emoji_stats(messages):

    all_emojis = []

    for msg in messages:

        chars = [
            ch
            for ch in msg["message"]
            if ch in emoji.EMOJI_DATA
        ]

        all_emojis.extend(chars)

    if not all_emojis:
        return "🙂", 0

    counter = Counter(all_emojis)

    fav, count = counter.most_common(1)[0]

    return fav, count

from collections import Counter

STOPWORDS = {
    "the","a","an","is","are",
    "to","and","of","in",
    "for","on","at","i",
    "you","it","that","this","was","with",
    "as","by","be","from",
}

import re

def get_top_words(messages):

    words = []

    for msg in messages:

        cleaned = re.sub(
            r"[^a-zA-Z ]",
            "",
            msg["message"].lower()
        )

        words.extend(cleaned.split())

    filtered = [
        w
        for w in words
        if len(w) > 2 and w not in STOPWORDS
    ]

    counter = Counter(filtered)

    result = []

    for word, count in counter.most_common(10):

        result.append({
            "word": word,
            "count": count,
            "size": min(5, max(1, count // 10))
        })

    return result

from collections import defaultdict
from datetime import datetime

def get_monthly_data(messages):

    monthly = defaultdict(int)

    for msg in messages:

        try:
            dt = datetime.strptime(
                msg["date"],
                "%d/%m/%y"
            )

            month = dt.strftime("%b")

            monthly[month] += 1

        except:
            pass

    result = []

    for month, count in monthly.items():

        result.append({
            "month": month,
            "you": count,
            "partner": 0
        })

    return result

def get_peak_month(monthly_data):

    if not monthly_data:
        return ""

    return max(
        monthly_data,
        key=lambda x: x["you"]
    )["month"]
