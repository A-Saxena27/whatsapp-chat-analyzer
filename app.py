import streamlit as st
import matplotlib.pyplot as plt
import preprocessor
import helper

st.set_page_config(
    page_title="WhatsApp Chat Analyzer",
    layout="wide"
)

st.sidebar.title("WhatsApp Analyzer")

st.title("WhatsApp Chat Analyzer")

st.markdown(
    "Analyze WhatsApp chats with interactive insights and visualizations."
)

uploaded_file = st.file_uploader(
    "Choose a WhatsApp chat file"
)

if uploaded_file is not None:

    bytes_data = uploaded_file.getvalue()

    data = bytes_data.decode("utf-8")

    df = preprocessor.preprocess(data)

    user_list = df['user'].unique().tolist()

    if 'group_notification' in user_list:
        user_list.remove('group_notification')

    user_list.sort()

    user_list.insert(0, "Overall")

    selected_user = st.sidebar.selectbox(
        "Show analysis for",
        user_list
    )

    # Chat Preview
    st.title("Chat Preview")

    st.dataframe(df)

    # Statistics
    (
        num_messages,
        words,
        media_messages,
        num_links
    ) = helper.fetch_stats(selected_user, df)

    st.title("Top Statistics")

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.subheader("Messages")
        st.title(num_messages)

    with col2:
        st.subheader("Words")
        st.title(words)

    with col3:
        st.subheader("Media")
        st.title(media_messages)

    with col4:
        st.subheader("Links")
        st.title(num_links)

    # Monthly Timeline
    st.title("Monthly Timeline")

    timeline = helper.monthly_timeline(
        selected_user,
        df
    )

    fig, ax = plt.subplots()

    ax.plot(
        timeline['time'],
        timeline['message']
    )

    plt.xticks(rotation='vertical')

    st.pyplot(fig)

    # Emoji Analysis
    st.title("Emoji Analysis")

    emoji_df = helper.emoji_helper(
        selected_user,
        df
    )

    col1, col2 = st.columns(2)

    with col1:
        st.dataframe(emoji_df)

    with col2:

        if not emoji_df.empty:

            fig, ax = plt.subplots()

            ax.pie(
                emoji_df[1].head(),
                labels=emoji_df[0].head(),
                autopct="%0.2f"
            )

            st.pyplot(fig)

    # Most Busy Users
    if selected_user == 'Overall':

        st.title("Most Busy Users")

        x, new_df = helper.most_busy_users(df)

        fig, ax = plt.subplots()

        col1, col2 = st.columns(2)

        with col1:
            st.dataframe(new_df)

        with col2:
            ax.pie(
                new_df['percent'],
                labels=new_df['name'],
                autopct="%0.2f"
            )

            st.pyplot(fig)

    # Shared Domains
    st.title("Most Shared Domains")

    domain_data = helper.fetch_link_domains(df)

    if domain_data:

        domain_names = [i[0] for i in domain_data]
        domain_counts = [i[1] for i in domain_data]

        domain_df = {
            "Domain": domain_names,
            "Count": domain_counts
        }

        st.bar_chart(
            domain_df,
            x="Domain",
            y="Count"
        )

    # Chat Summary
    st.markdown("---")

    st.subheader("Chat Summary")

    st.write(f"""
    - Total Messages: {num_messages}
    - Total Words: {words}
    - Media Shared: {media_messages}
    - Links Shared: {num_links}
    """)