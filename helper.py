from urlextract import URLExtract

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