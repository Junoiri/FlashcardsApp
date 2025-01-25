import axios from "axios";

const API_URL = "http://localhost:8000/";

export const getAllFlashcards = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { success: false, message: "No authentication token found" };
  }

  try {
    const response = await axios.get(`${API_URL}/flashcards`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Failed to fetch flashcards:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch flashcards",
    };
  }
};
