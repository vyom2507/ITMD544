// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = credentials;

    // Hardcoded for now; replace with API call if needed
    if (username === "admin1" && password === "admin123") {
      alert("✅ Login successful!");
      navigate("/admin/dashboard");
    } else if (username === "admin2" && password === "admin456") {
      alert("✅ Login successful!");
      navigate("/admin/dashboard");
    } else {
      setError("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
          <a href="/shipping">Shipping</a>
          <a href="/admin">Admin Login</a>
        </div>
      </nav>

      <div className="register-container">
        <h2>🔐 Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
