import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const uploadChat = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(`${API_URL}/analyze`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
