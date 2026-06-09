import re
import pandas as pd


def preprocess(data):

    # WhatsApp export format:
    # 02/05/2026, 18:13 - User: Message

    pattern = r'(\d{1,2}/\d{1,2}/\d{4},\s\d{1,2}:\d{2}\s-\s)'

    parts = re.split(pattern, data)

    if len(parts) < 3:
        return pd.DataFrame(columns=[
            'message_date',
            'user',
            'message',
            'only_date',
            'year',
            'month_num',
            'month',
            'day',
            'day_name',
            'hour',
            'minute',
            'period'
        ])

    dates = parts[1::2]
    messages = parts[2::2]

    df = pd.DataFrame({
        'message_date': dates,
        'user_message': messages
    })

    # Clean dates
    df['message_date'] = (
        df['message_date']
        .astype(str)
        .str.replace(' - ', '', regex=False)
        .str.strip()
    )

    # Convert to datetime
    df['message_date'] = pd.to_datetime(
        df['message_date'],
        format='%d/%m/%Y, %H:%M',
        errors='coerce'
    )

    df.dropna(subset=['message_date'], inplace=True)

    users = []
    messages_list = []

    for message in df['user_message']:

        entry = re.split(r'([^:]+):\s', str(message), maxsplit=1)

        if len(entry) >= 3:
            users.append(entry[1].strip())
            messages_list.append(entry[2].strip())
        else:
            users.append('group_notification')
            messages_list.append(str(message).strip())

    df['user'] = users
    df['message'] = messages_list

    # Remove empty rows
    df['message'] = df['message'].astype(str)
    df = df[df['message'].str.strip() != ""]

    # Date features
    df['only_date'] = df['message_date'].dt.date
    df['year'] = df['message_date'].dt.year
    df['month_num'] = df['message_date'].dt.month
    df['month'] = df['message_date'].dt.month_name()
    df['day'] = df['message_date'].dt.day
    df['day_name'] = df['message_date'].dt.day_name()
    df['hour'] = df['message_date'].dt.hour
    df['minute'] = df['message_date'].dt.minute

    period = []

    for hour in df['hour']:

        if hour == 23:
            period.append("23-00")

        elif hour == 0:
            period.append("00-01")

        else:
            period.append(f"{hour}-{hour + 1}")

    df['period'] = period

    return df