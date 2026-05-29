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

    users = []
    messages_list = []

    for message in df['user_message']:

        entry = re.split(r'([\w\W]+?):\s', message)

        if entry[1:]:

            users.append(entry[1])
            messages_list.append(entry[2])

        else:
            users.append('group_notification')
            messages_list.append(entry[0])

    df['user'] = users
    df['message'] = messages_list

    df.drop(columns=['user_message'], inplace=True)

    return df