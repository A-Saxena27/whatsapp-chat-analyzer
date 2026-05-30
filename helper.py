from urlextract import URLExtract
from collections import Counter
import pandas as pd
import emoji

extract = URLExtract()


def fetch_stats(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

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


def most_busy_users(df):

    x = df['user'].value_counts().head()

    percent_df = round(
        (df['user'].value_counts() / df.shape[0]) * 100,
        2
    ).reset_index()

    percent_df.columns = ['name', 'percent']

    return x, percent_df


def fetch_link_domains(df):

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


def daily_timeline(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    daily_timeline = (
        df.groupby('only_date')['message']
        .count()
        .reset_index()
    )

    return daily_timeline


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


def activity_heatmap(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    return pd.crosstab(
        df['day_name'],
        df['period']
    )


def emoji_helper(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

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

from wordcloud import WordCloud

def create_wordcloud(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

    wc = WordCloud(
        width=500,
        height=500,
        min_font_size=10,
        background_color='white'
    )

    text = df['message'].str.cat(sep=" ")

    return wc.generate(text)

def most_common_words(selected_user, df):

    if selected_user != 'Overall':
        df = df[df['user'] == selected_user]

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