import { useState } from "react";
import "../styles/Auth.css";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    repeat: false,
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: !username,
      email: !email,
      password: !password,
      repeat: !repeat || password !== repeat,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Register successful!");
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Register failed:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="body">
      <form onSubmit={handleRegister} className="form">
        <h2 className="bold">Register</h2>

        <input
          type="text"
          placeholder={errors.username ? "Username is required" : "Username"}
          className={`input ${errors.username ? "input-error" : ""}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder={errors.email ? "Email is required" : "Email"}
          className={`input ${errors.email ? "input-error" : ""}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder={errors.password ? "Password is required" : "Password"}
          className={`input ${errors.password ? "input-error" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder={
            errors.repeat ? "Passwords must match" : "Repeat Password"
          }
          className={`input ${errors.repeat ? "input-error" : ""}`}
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        />

        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  );
}
