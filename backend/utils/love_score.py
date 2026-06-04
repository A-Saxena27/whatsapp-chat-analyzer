def calculate_love_score(stats):
    score = 0

    # Heart emojis
    score += min(stats["heart_count"] * 0.05, 20)

    # Romantic words
    score += min(stats["romantic_word_count"] * 0.03, 20)

    # Fast replies
    if stats["avg_response_minutes"] < 5:
        score += 20
    elif stats["avg_response_minutes"] < 15:
        score += 10

    # Late night chats
    if stats["late_night_messages"] > 500:
        score += 15

    # Consistency
    if stats["active_days_percentage"] > 70:
        score += 25

    return round(min(score, 100))


ROMANTIC_WORDS = [
    "love",
    "miss",
    "baby",
    "babe",
    "darling",
    "cute",
    "beautiful",
    "handsome",
    "kiss",
    "hug"
]


def count_romantic_words(messages):
    romantic_count = 0
    
    for msg in messages:
        text = msg["message"].lower()
        
        for word in ROMANTIC_WORDS:
            if word in text:
                romantic_count += 1
    
    return romantic_count