import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8000/auth";

/**
 * Authenticates the user by either registering or logging in.
 *
 * @param {boolean} isRegister - Indicates whether the user is registering or logging in.
 * @param {Object} formData - The form data containing user credentials.
 * @param {string} formData.username - The username of the user (required for registration).
 * @param {string} formData.email - The email of the user.
 * @param {string} formData.password - The password of the user.
 * @param {string} formData.repeat - The repeated password (required for registration).
 * @returns {Promise<Object>} The result of the authentication process.
 */
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

/**
 * Retrieves the current user from the stored token.
 *
 * @returns {Object|null} The decoded token containing user information, or null if the token is invalid or expired.
 */
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      console.log("Token Found:", token);

      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token has expired.");
        return null;
      }

      if (!decodedToken.userId) {
        console.error("User ID not found in token.");
        return null;
      }

      return { ...decodedToken, id: decodedToken.userId, token };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  console.log("No token found in localStorage.");
  return null;
};
