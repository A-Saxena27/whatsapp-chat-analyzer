
from sklearn.feature_extraction.text import CountVectorizer  # type: ignore[import]
from textblob import TextBlob  # type: ignore[import]
from urlextract import URLExtract
from collections import Counter
from wordcloud import WordCloud
import pandas as pd
import emoji

extract = URLExtract()


# ---------------- FETCH STATS ---------------- #

def fetch_stats(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    # FIX STRING ISSUES
    df['message'] = df['message'].fillna('').astype(str)

    num_messages = df.shape[0]

    words = []

    for message in df['message']:
        words.extend(message.split())

    num_words = len(words)

    num_media_messages = df[
        df['message'].str.contains(
            '<Media omitted>',
            na=False
        )
    ].shape[0]

    links = []

    for message in df['message']:
        links.extend(extract.find_urls(message))

    return (
        num_messages,
        num_words,
        num_media_messages,
        len(links)
    )


# ---------------- MOST BUSY USERS ---------------- #

def most_busy_users(df):

    x = df['user'].value_counts().head()

    percent_df = round(
        (df['user'].value_counts() / df.shape[0]) * 100,
        2
    ).reset_index()

    percent_df.columns = ['name', 'percent']

    return x, percent_df


# ---------------- LINK DOMAINS ---------------- #

def fetch_link_domains(df):

    df['message'] = df['message'].fillna('').astype(str)

    links = []

    for message in df['message']:
        links.extend(extract.find_urls(message))

    domains = []

    for link in links:

        try:
            domain = link.split('/')[2]
            domains.append(domain)

        except:
            pass

    return Counter(domains).most_common(10)


# ---------------- MONTHLY TIMELINE ---------------- #

def monthly_timeline(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    timeline = (
        df.groupby(
            ['year', 'month_num', 'month']
        )['message']
        .count()
        .reset_index()
    )

    time = []

    for i in range(timeline.shape[0]):

        time.append(
            timeline['month'][i]
            + "-"
            + str(timeline['year'][i])
        )

    timeline['time'] = time

    return timeline


# ---------------- DAILY TIMELINE ---------------- #

def daily_timeline(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    daily_timeline = (
        df.groupby('only_date')['message']
        .count()
        .reset_index()
    )

    return daily_timeline


# ---------------- WEEK ACTIVITY ---------------- #

def week_activity_map(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    order = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ]

    activity = df['day_name'].value_counts()

    return activity.reindex(order)


# ---------------- MONTH ACTIVITY ---------------- #

def month_activity_map(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    order = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    activity = df['month'].value_counts()

    return activity.reindex(order)


# ---------------- HEATMAP ---------------- #

def activity_heatmap(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    return pd.crosstab(
        df['day_name'],
        df['period']
    )


# ---------------- EMOJI ANALYSIS ---------------- #

def emoji_helper(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    df['message'] = df['message'].fillna('').astype(str)

    emojis = []

    for message in df['message']:

        for char in message:

            if char in emoji.EMOJI_DATA:
                emojis.append(char)

    emoji_df = pd.DataFrame(
        Counter(emojis).most_common(
            len(Counter(emojis))
        )
    )

    return emoji_df


# ---------------- WORD CLOUD ---------------- #

def create_wordcloud(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    df['message'] = df['message'].fillna('').astype(str)

    wc = WordCloud(
        width=500,
        height=500,
        min_font_size=10,
        background_color='white'
    )

    text = df['message'].str.cat(sep=" ")

    return wc.generate(text)


# ---------------- MOST COMMON WORDS ---------------- #

def most_common_words(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    df['message'] = df['message'].fillna('').astype(str)

    with open('stop_hinglish.txt', 'r', encoding='utf-8') as f:
        stop_words = f.read().splitlines()

    words = []

    for message in df['message']:

        for word in message.lower().split():

            if word not in stop_words:
                words.append(word)

    common_df = pd.DataFrame(
        Counter(words).most_common(20)
    )

    return common_df


# ---------------- SENTIMENT ANALYSIS ---------------- #

def sentiment_analysis(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    df['message'] = df['message'].fillna('').astype(str)

    positive = 0
    negative = 0
    neutral = 0

    for message in df['message']:

        analysis = TextBlob(message)

        score = analysis.sentiment.polarity

        if score > 0:
            positive += 1

        elif score < 0:
            negative += 1

        else:
            neutral += 1

    return positive, negative, neutral


# ---------------- NLP KEYWORDS ---------------- #

# NLP KEYWORDS EXTRACTION

def extract_keywords(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    # REMOVE NULL VALUES
    df = df.dropna(subset=['message'])

    # CONVERT TO STRING
    df['message'] = df['message'].astype(str)

    # COMBINE TEXT
    text = " ".join(df['message'])

    # HANDLE EMPTY CHAT
    if text.strip() == "":
        return pd.DataFrame({
            'Keyword': [],
            'Count': []
        })

    try:

        vectorizer = CountVectorizer(
            stop_words='english',
            max_features=10
        )

        X = vectorizer.fit_transform([text])

        keywords = vectorizer.get_feature_names_out()

        counts = X.toarray()[0]

        keyword_df = pd.DataFrame({
            'Keyword': keywords,
            'Count': counts
        })

        keyword_df = keyword_df.sort_values(
            by='Count',
            ascending=False
        )

        return keyword_df

    except ValueError:

        # HANDLE EMPTY VOCABULARY ERROR
        return pd.DataFrame({
            'Keyword': [],
            'Count': []
        })

# ---------------- CHAT PERSONALITY ---------------- #

# CHAT PERSONALITY

def chat_personality(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    # REMOVE NULL VALUES
    df = df.dropna(subset=['message'])

    # CONVERT TO STRING
    df['message'] = df['message'].astype(str)

    total_messages = df.shape[0]

    # CALCULATE AVERAGE WORDS
    word_counts = df['message'].apply(
        lambda x: len(x.split())
    )

    avg_words = round(
        word_counts.mean(),
        2
    ) if not word_counts.empty else 0

    emojis = 0

    for message in df['message']:

        for char in message:

            if char in emoji.EMOJI_DATA:
                emojis += 1

    links = 0

    for message in df['message']:

        links += len(
            extract.find_urls(message)
        )

    return {
        "Total Messages": total_messages,
        "Average Words/Message": avg_words,
        "Total Emojis": emojis,
        "Total Links Shared": links
    }

# ---------------- CONVERSATION INSIGHTS ---------------- #

  # CONVERSATION INSIGHTS

def conversation_insights(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    # REMOVE NULL VALUES
    df = df.dropna(subset=['message'])

    # HANDLE EMPTY DATAFRAME
    if df.empty:

        return {
            "Longest Message Words": 0,
            "Most Active Day": "No Data",
            "Most Active Hour": "No Data"
        }

    # CONVERT MESSAGE TO STRING
    df['message'] = df['message'].astype(str)

    # LONGEST MESSAGE
    longest_message = df['message'].apply(
        lambda x: len(x.split())
    ).max()

    # MOST ACTIVE DAY
    if 'day_name' in df.columns and not df['day_name'].empty:

        day_counts = df['day_name'].value_counts()

        most_active_day = (
            day_counts.idxmax()
            if not day_counts.empty
            else "No Data"
        )

    else:
        most_active_day = "No Data"

    # MOST ACTIVE HOUR
    if 'hour' in df.columns and not df['hour'].empty:

        hour_counts = df['hour'].value_counts()

        most_active_hour = (
            f"{hour_counts.idxmax()}:00"
            if not hour_counts.empty
            else "No Data"
        )

    else:
        most_active_hour = "No Data"

    return {
        "Longest Message Words": longest_message,
        "Most Active Day": most_active_day,
        "Most Active Hour": most_active_hour
    }


# ---------------- RESPONSE TIME ---------------- #

def response_time_analysis(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    df = df.sort_values('message_date')

    response_times = []

    for i in range(1, len(df)):

        current_user = df.iloc[i]['user']
        previous_user = df.iloc[i - 1]['user']

        if current_user != previous_user:

            current_time = df.iloc[i]['message_date']
            previous_time = df.iloc[i - 1]['message_date']

            diff = (
                current_time - previous_time
            ).total_seconds() / 60

            response_times.append(diff)

    if len(response_times) == 0:
        return 0

    return round(
        sum(response_times) / len(response_times),
        2
    )
