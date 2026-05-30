
import streamlit as st
import matplotlib.pyplot as plt
import seaborn as sns
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

    # FIX ENCODING ERRORS
    try:
        data = bytes_data.decode("utf-8")

    except UnicodeDecodeError:
        data = bytes_data.decode("latin-1")

    # PREPROCESS DATA
    df = preprocessor.preprocess(data)

    # SAFETY FIXES
    df['message'] = df['message'].fillna('').astype(str)
    df['user'] = df['user'].fillna('Unknown').astype(str)

    # USER LIST
    user_list = df['user'].unique().tolist()

    if 'group_notification' in user_list:
        user_list.remove('group_notification')

    user_list.sort()

    user_list.insert(0, "Overall")

    selected_user = st.sidebar.selectbox(
        "Show analysis for",
        user_list
    )

    # CHAT PREVIEW
    st.header("Chat Preview")

    with st.expander("View Processed Chat Data"):
        st.dataframe(df)

    # FETCH STATS
    (
        num_messages,
        words,
        media_messages,
        num_links
    ) = helper.fetch_stats(selected_user, df)

    # TOP STATISTICS
    st.header("Top Statistics")

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Messages", num_messages)

    with col2:
        st.metric("Words", words)

    with col3:
        st.metric("Media Messages", media_messages)

    with col4:
        st.metric("Shared Links", num_links)

    # TIMELINE ANALYSIS
    st.header("Timeline Analysis")

    # MONTHLY TIMELINE
    st.subheader("Monthly Timeline")

    timeline = helper.monthly_timeline(
        selected_user,
        df
    )

    if not timeline.empty:

        fig, ax = plt.subplots()

        ax.plot(
            timeline['time'],
            timeline['message'],
            color='green'
        )

        plt.xticks(rotation=45)

        st.pyplot(fig)

    else:
        st.warning("No monthly timeline data available.")

    # DAILY TIMELINE
    st.subheader("Daily Timeline")

    daily_timeline = helper.daily_timeline(
        selected_user,
        df
    )

    if not daily_timeline.empty:

        fig, ax = plt.subplots()

        ax.plot(
            daily_timeline['only_date'],
            daily_timeline['message'],
            color='blue'
        )

        plt.xticks(rotation=45)

        st.pyplot(fig)

    else:
        st.warning("No daily timeline data available.")

    # ACTIVITY ANALYSIS
    st.header("Activity Analysis")

    # WEEKLY ACTIVITY
    st.subheader("Weekly Activity")

    week_activity = helper.week_activity_map(
        selected_user,
        df
    )

    st.bar_chart(week_activity)

    # MONTHLY ACTIVITY
    st.subheader("Monthly Activity")

    month_activity = helper.month_activity_map(
        selected_user,
        df
    )

    st.bar_chart(month_activity)

    # HEATMAP
    st.subheader("Activity Heatmap")

    heatmap = helper.activity_heatmap(
        selected_user,
        df
    )

    if heatmap.empty:

        st.warning("No heatmap data available.")

    else:

        fig, ax = plt.subplots(figsize=(12, 6))

        sns.heatmap(
            heatmap,
            ax=ax,
            cmap="YlGnBu"
        )

        st.pyplot(fig)

    # EMOJI ANALYSIS
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

        else:
            st.warning("No emojis found.")

    # SENTIMENT ANALYSIS
    st.header("Sentiment Analysis")

    positive, negative, neutral = helper.sentiment_analysis(
        selected_user,
        df
    )

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Positive 😊", positive)

    with col2:
        st.metric("Negative 😔", negative)

    with col3:
        st.metric("Neutral 😐", neutral)

    # USER ANALYSIS
    st.header("User Analysis")

    if selected_user == 'Overall':

        st.subheader("Most Busy Users")

        x, new_df = helper.most_busy_users(df)

        col1, col2 = st.columns(2)

        with col1:
            st.dataframe(new_df)

        with col2:

            fig, ax = plt.subplots()

            ax.pie(
                new_df['percent'],
                labels=new_df['name'],
                autopct="%0.2f"
            )

            st.pyplot(fig)

    # MOST SHARED DOMAINS
    st.header("Most Shared Domains")

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

    else:
        st.warning("No links found.")

    # WORD CLOUD
    st.header("Word Cloud")

    try:

        wc = helper.create_wordcloud(
            selected_user,
            df
        )

        fig, ax = plt.subplots()

        ax.imshow(wc)

        ax.axis("off")

        st.pyplot(fig)

    except:
        st.warning("Not enough text for word cloud.")

    # MOST COMMON WORDS
    st.header("Most Common Words")

    common_df = helper.most_common_words(
        selected_user,
        df
    )

    col1, col2 = st.columns(2)

    with col1:
        st.dataframe(common_df)

    with col2:

        if not common_df.empty:

            fig, ax = plt.subplots()

            ax.barh(
                common_df[0],
                common_df[1]
            )

            plt.tight_layout()

            st.pyplot(fig)

    # NLP KEYWORDS
    st.header("NLP Keyword Extraction")

    keyword_df = helper.extract_keywords(
        selected_user,
        df
    )

    st.dataframe(keyword_df)

    if not keyword_df.empty:

        fig, ax = plt.subplots()

        ax.bar(
            keyword_df['Keyword'],
            keyword_df['Count']
        )

        plt.xticks(rotation=45)

        st.pyplot(fig)

    # CHAT PERSONALITY
    st.header("Chat Personality Metrics")

    personality = helper.chat_personality(
        selected_user,
        df
    )

    col1, col2 = st.columns(2)

    with col1:

        st.metric(
            "Total Messages",
            personality["Total Messages"]
        )

        st.metric(
            "Average Words/Message",
            personality["Average Words/Message"]
        )

    with col2:

        st.metric(
            "Total Emojis",
            personality["Total Emojis"]
        )

        st.metric(
            "Links Shared",
            personality["Total Links Shared"]
        )

    # RESPONSE TIME
    st.header("Response Time Analysis")

    avg_response = helper.response_time_analysis(
        selected_user,
        df
    )

    st.metric(
        "Average Response Time (minutes)",
        avg_response
    )

    # CONVERSATION INSIGHTS
    st.header("Conversation Insights")

    insights = helper.conversation_insights(
        selected_user,
        df
    )

    st.write(
        f"📌 Longest Message Words: {insights['Longest Message Words']}"
    )

    st.write(
        f"📅 Most Active Day: {insights['Most Active Day']}"
    )

    st.write(
        f"⏰ Most Active Hour: {insights['Most Active Hour']}"
    )

    # SUMMARY
    st.markdown("---")

    st.subheader("Chat Summary")

    st.write(f"""
    - Total Messages: {num_messages}
    - Total Words: {words}
    - Media Shared: {media_messages}
    - Links Shared: {num_links}
    """)

    # DOWNLOAD CSV
    csv = df.to_csv(index=False)

    st.download_button(
        label="Download Processed Data",
        data=csv,
        file_name="chat_analysis.csv",
        mime="text/csv"
    )
