import axios from "axios";

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

    localStorage.setItem("token", response.data.token);
    return { success: true };
  } catch (error) {
    console.error("Authentication failed:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Invalid credentials",
    };
  }
};
