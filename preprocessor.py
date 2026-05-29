import re
import pandas as pd


def preprocess(data):

    pattern = r'\d{1,2}/\d{1,2}/\d{2,4},\s\d{1,2}:\d{2}\s?[ap]m\s-\s'

    messages = re.split(pattern, data)[1:]
    dates = re.findall(pattern, data)

    df = pd.DataFrame({
        'message_date': dates,
        'user_message': messages
    })

    # convert date
    df['message_date'] = pd.to_datetime(df['message_date'])

    users = []
    messages_list = []

    for message in df['user_message']:

        entry = re.split(r'([\w\W]+?):\s', message)

        # user messages
        if entry[1:]:

            users.append(entry[1])
            messages_list.append(entry[2])

        # group notifications
        else:

            users.append('group_notification')
            messages_list.append(entry[0])

    df['user'] = users
    df['message'] = messages_list

    df.drop(columns=['user_message'], inplace=True)

    # timeline columns
    df['year'] = df['message_date'].dt.year

    df['month_num'] = df['message_date'].dt.month

    df['month'] = df['message_date'].dt.month_name()

    df['day'] = df['message_date'].dt.day

    df['day_name'] = df['message_date'].dt.day_name()

    df['hour'] = df['message_date'].dt.hour

    df['minute'] = df['message_date'].dt.minute

    df['only_date'] = df['message_date'].dt.date

    # period analysis
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