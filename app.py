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

    with st.expander("View Processed Chat Data"):
        st.dataframe(df)

    st.header("Chat Overview")

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
        st.metric(
    "Messages",
    num_messages
)

    with col2:
        st.subheader("Words")
        st.metric(
    "Words",
    words
)

    with col3:
        st.subheader("Media")
        st.metric(
    "Media Messages",
    media_messages
)

    with col4:
        st.subheader("Links")
        st.metric(
    "Shared Links",
    num_links
)

        # Timeline Analysis

    st.header("Timeline Analysis")

# Monthly Timeline

    st.subheader("Monthly Timeline")

    timeline = helper.monthly_timeline(
    selected_user,
    df
)

    fig, ax = plt.subplots()

    ax.plot(
    timeline['time'],
    timeline['message']
)

    plt.xticks(rotation=45)

    st.pyplot(fig)

# Daily Timeline

    st.subheader("Daily Timeline")

    daily_timeline = helper.daily_timeline(
    selected_user,
    df
)

    fig, ax = plt.subplots()

    ax.plot(
    daily_timeline['only_date'],
    daily_timeline['message']
)

    plt.xticks(rotation=45)

    st.pyplot(fig)

# Activity Analysis

    st.header("Activity Analysis")

# Weekly Activity

    st.subheader("Weekly Activity")

    week_activity = helper.week_activity_map(
    selected_user,
    df
)

    st.bar_chart(week_activity)

# Monthly Activity

    st.subheader("Monthly Activity")

    month_activity = helper.month_activity_map(
    selected_user,
    df
)

    st.bar_chart(month_activity)

# Activity Heatmap

    import seaborn as sns

    st.subheader("Activity Heatmap")

    heatmap = helper.activity_heatmap(
    selected_user,
    df
    )

    fig, ax = plt.subplots(figsize=(12, 6))

    sns.heatmap(
    heatmap,
    ax=ax
    )

    st.pyplot(fig)

    # Emoji Analysis
    st.header("Emoji Analysis")

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

    st.header("User Analysis")

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

    st.header("Word Cloud")

    wc = helper.create_wordcloud(
    selected_user,
    df
)

    fig, ax = plt.subplots()

    ax.imshow(wc)

    ax.axis("off")

    st.pyplot(fig)

    st.header("Most Common Words")

    common_df = helper.most_common_words(
        selected_user,
        df
    )

    col1, col2 = st.columns(2)

    with col1:
        st.dataframe(common_df)

    with col2:

        fig, ax = plt.subplots()

        ax.barh(
            common_df[0],
            common_df[1]
        )

        plt.tight_layout()

        st.pyplot(fig)

            # Chat Summary
    st.markdown("---")

    st.subheader("Chat Summary")

    st.write(f"""
    - Total Messages: {num_messages}
    - Total Words: {words}
    - Media Shared: {media_messages}
    - Links Shared: {num_links}
    """)

    csv = df.to_csv(index=False)

    st.download_button(
        label="Download Processed Data",
        data=csv,
        file_name="chat_analysis.csv",
        mime="text/csv"
    )
