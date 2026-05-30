import re
import pandas as pd


def preprocess(data):

    # WHATSAPP CHAT PATTERN
    pattern = r'(\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}\s?[APMapm]{0,2}\s-\s)'

    messages = re.split(pattern, data)[1:]

    dates = messages[0::2]
    texts = messages[1::2]

    df = pd.DataFrame({
        'message_date': dates,
        'user_message': texts
    })

    # CLEAN DATE
    df['message_date'] = (
        df['message_date']
        .astype(str)
        .str.replace(' - ', '', regex=False)
        .str.strip()
    )

    # CONVERT DATE
    df['message_date'] = pd.to_datetime(
        df['message_date'],
        errors='coerce'
    )

    # REMOVE INVALID DATES
    df.dropna(subset=['message_date'], inplace=True)

    users = []
    messages_list = []

    for message in df['user_message']:

        entry = re.split(r'([\w\W]+?):\s', message, maxsplit=1)

        if len(entry) >= 3:

            users.append(entry[1])
            messages_list.append(entry[2])

        else:

            users.append('group_notification')
            messages_list.append(message)

    df['user'] = users
    df['message'] = messages_list

    # REMOVE NULLS
    df.dropna(subset=['message'], inplace=True)

    # CONVERT MESSAGE TO STRING
    df['message'] = df['message'].astype(str)

    # DATE FEATURES
    df['only_date'] = df['message_date'].dt.date
    df['year'] = df['message_date'].dt.year
    df['month_num'] = df['message_date'].dt.month
    df['month'] = df['message_date'].dt.month_name()
    df['day'] = df['message_date'].dt.day
    df['day_name'] = df['message_date'].dt.day_name()
    df['hour'] = df['message_date'].dt.hour
    df['minute'] = df['message_date'].dt.minute

    period = []

    for hour in df[['day_name', 'hour']]['hour']:

        if hour == 23:
            period.append(str(hour) + "-" + str('00'))

        elif hour == 0:
            period.append(str('00') + "-" + str(hour + 1))

        else:
            period.append(str(hour) + "-" + str(hour + 1))

    df['period'] = period

    return df