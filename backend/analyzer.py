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

    you_time, partner_time = calculate_response_times(messages)

    love_score = calculate_love_score(messages)

    most_active_time = get_most_active_time(messages)

    radar_data = get_radar_data(messages)

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
        "loveScore": love_score,
        "mostRomanticMsg": find_romantic_message(messages),
        "radarData": radar_data,
        "greenFlags": get_green_flags(messages),
        "redFlags": get_red_flags(messages),
        "achievements": get_achievements(messages),
        "mostActiveTime": most_active_time,
        "youResponseTime": you_time,
        "partnerResponseTime": partner_time,
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

    users = list(
        set(msg["sender"] for msg in messages)
    )

    if len(users) < 2:
        return []

    user1 = users[0]
    user2 = users[1]

    monthly = defaultdict(
        lambda: {
            "you": 0,
            "partner": 0
        }
    )

    for msg in messages:

        try:

            dt = datetime.strptime(
                msg["date"],
                "%d/%m/%y"
            )

            month = dt.strftime("%b")

            if msg["sender"] == user1:
                monthly[month]["you"] += 1

            else:
                monthly[month]["partner"] += 1

        except:
            pass

    return [
        {
            "month": m,
            "you": v["you"],
            "partner": v["partner"]
        }
        for m, v in monthly.items()
    ]

def get_peak_month(monthly_data):

    if not monthly_data:
        return ""

    return max(
        monthly_data,
        key=lambda x: x["you"]
    )["month"]

from datetime import datetime

def calculate_response_times(messages):

    if len(messages) < 2:
        return "0m", "0m"

    users = list(set(msg["sender"] for msg in messages))

    if len(users) < 2:
        return "0m", "0m"

    user1 = users[0]
    user2 = users[1]

    user1_times = []
    user2_times = []

    previous = None

    for msg in messages:

        try:
            current_time = datetime.strptime(
                f"{msg['date']} {msg['time']}",
                "%d/%m/%y %I:%M %p"
            )

            if previous:

                prev_sender = previous["sender"]

                prev_time = datetime.strptime(
                    f"{previous['date']} {previous['time']}",
                    "%d/%m/%y %I:%M %p"
                )

                diff = (
                    current_time - prev_time
                ).total_seconds() / 60

                if msg["sender"] != prev_sender:

                    if msg["sender"] == user1:
                        user1_times.append(diff)

                    else:
                        user2_times.append(diff)

            previous = msg

        except:
            continue

    avg1 = round(sum(user1_times)/len(user1_times),1) if user1_times else 0
    avg2 = round(sum(user2_times)/len(user2_times),1) if user2_times else 0

    return f"{avg1}m", f"{avg2}m"

LOVE_WORDS = [
    "love",
    "miss",
    "baby",
    "darling",
    "sweetheart",
    "cute",
    "beautiful",
    "mine",
    "❤️",
    "😘",
    "🥰",
]

def calculate_love_score(messages):

    score = 0

    for msg in messages:

        text = msg["message"].lower()

        for word in LOVE_WORDS:

            if word in text:
                score += 1

    return min(100, score * 2)

ROMANTIC_KEYWORDS = [
    "love",
    "miss",
    "beautiful",
    "cute",
    "baby",
    "darling",
    "sweet",
    "wife",
    "husband",
]

def find_romantic_message(messages):

    best = None
    score = 0

    for msg in messages:

        text = msg["message"]

        current = sum(
            1
            for word in ROMANTIC_KEYWORDS
            if word in text.lower()
        )

        if current > score:

            score = current

            best = {
                "text": text,
                "date": msg["date"]
            }

    return best or {
        "text": "No romantic messages found 💔",
        "date": ""
    }

def get_green_flags(messages):

    flags = []

    total = len(messages)

    if total > 1000:
        flags.append("Consistent communication 💬")

    if calculate_love_score(messages) > 40:
        flags.append("Affectionate conversations ❤️")

    if get_emoji_stats(messages)[1] > 20:
        flags.append("Expressive texting 😄")

    return flags

def get_red_flags(messages):

    flags = []

    love_score = calculate_love_score(messages)

    if love_score < 10:
        flags.append("Very few affectionate messages 😶")

    if len(messages) < 50:
        flags.append("Low conversation frequency 📉")

    return flags

def get_achievements(messages):

    achievements = []

    if len(messages) > 1000:

        achievements.append({
            "icon":"🔥",
            "title":"Chat Machine",
            "desc":"1000+ messages",
            "unlocked":True
        })

    if get_emoji_stats(messages)[1] > 50:

        achievements.append({
            "icon":"😂",
            "title":"Emoji Master",
            "desc":"Heavy emoji usage",
            "unlocked":True
        })

    if calculate_love_score(messages) > 50:

        achievements.append({
            "icon":"❤️",
            "title":"Hopeless Romantic",
            "desc":"Lots of affection",
            "unlocked":True
        })

    return achievements

from collections import Counter

def get_most_active_time(messages):

    hours = []

    for msg in messages:

        try:

            dt = datetime.strptime(
                f"{msg['date']} {msg['time']}",
                "%d/%m/%y %I:%M %p"
            )

            hours.append(dt.hour)

        except:
            continue

    if not hours:
        return "Unknown"

    most_active_hour = Counter(hours).most_common(1)[0][0]

    next_hour = (most_active_hour + 1) % 24

    def format_hour(hour):

        suffix = "AM"

        if hour >= 12:
            suffix = "PM"

        display = hour % 12

        if display == 0:
            display = 12

        return f"{display} {suffix}"

        return (
        f"{format_hour(most_active_hour)} - "
        f"{format_hour(next_hour)}"
    )

def get_radar_data(messages):

    total_messages = len(messages)

    love_score = calculate_love_score(messages)

    emoji_count = get_emoji_stats(messages)[1]

    humor_words = [
        "lol",
        "lmao",
        "haha",
        "hehe",
        "rofl"
    ]

    humor = 0

    for msg in messages:

        text = msg["message"].lower()

        for word in humor_words:

            if word in text:
                humor += 1

    humor_score = min(100, humor * 3)

    support_words = [
        "okay",
        "don't worry",
        "proud",
        "help",
        "with you",
        "take care"
    ]

    support = 0

    for msg in messages:

        text = msg["message"].lower()

        for word in support_words:

            if word in text:
                support += 1

    support_score = min(100, support * 4)

    passion_score = min(
        100,
        int(total_messages / 20)
    )

    trust_score = min(
        100,
        int(total_messages / 25)
    )

    loyalty_score = min(
        100,
        int(total_messages / 30)
    )

    return [
        {
            "subject": "Love",
            "A": love_score
        },
        {
            "subject": "Humor",
            "A": humor_score
        },
        {
            "subject": "Trust",
            "A": trust_score
        },
        {
            "subject": "Support",
            "A": support_score
        },
        {
            "subject": "Loyalty",
            "A": loyalty_score
        },
        {
            "subject": "Passion",
            "A": passion_score
        }
    ]