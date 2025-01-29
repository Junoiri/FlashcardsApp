import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8000/auth";

export const authenticateUser = async (isRegister, formData) => {
  const { username, email, password, repeat } = formData;

  const errors = {
    email: !email,
    password: !password,
    ...(isRegister && {
      username: !username,
      repeat: !repeat || password !== repeat,
    }),
  };

  if (Object.values(errors).some((error) => error)) {
    return { success: false, errors };
  }

  try {
    const endpoint = isRegister ? `${API_URL}/register` : `${API_URL}/login`;
    const data = isRegister
      ? { username, email, password }
      : { email, password };

    const response = await axios.post(endpoint, data);
    const token = response.data.token;

    localStorage.setItem("token", token);
    const user = jwtDecode(token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true };
  } catch (error) {
    console.error("Authentication failed:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Invalid credentials",
    };
  }
};

export const getCurrentUser = () => {
  console.log(
    "Checking localStorage for token:",
    localStorage.getItem("token")
  );

  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token has expired.");
        localStorage.removeItem("token");
        return null;
      }
      return { ...decodedToken, token };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  return null;
};
