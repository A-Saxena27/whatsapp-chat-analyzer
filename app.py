import streamlit as st
import preprocessor
import helper

st.title("WhatsApp Chat Analyzer")

uploaded_file = st.file_uploader("Choose a chat file")

if uploaded_file is not None:

    bytes_data = uploaded_file.getvalue()

    data = bytes_data.decode("utf-8")

    df = preprocessor.preprocess(data)

    st.dataframe(df)

    num_messages, words = helper.fetch_stats('Overall', df)

st.title("Top Statistics")

col1, col2 = st.columns(2)

with col1:
    st.header("Total Messages")
    st.title(num_messages)

with col2:
    st.header("Total Words")
    st.title(words)