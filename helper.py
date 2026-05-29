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
        df['message'] == '<Media omitted>\n'
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

    timeline = df.groupby(
        ['year', 'month']
    ).count()['message'].reset_index()

    time = []

    for i in range(timeline.shape[0]):

        time.append(
            timeline['month'][i] + "-" +
            str(timeline['year'][i])
        )

    timeline['time'] = time

    return timeline

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