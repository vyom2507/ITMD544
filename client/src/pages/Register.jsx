import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import "../styles.css";

const Register = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;
    return pattern.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, mobile, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !mobile || !password || !confirmPassword) {
      setError("⚠️ All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "🔒 Password must have at least 1 uppercase letter, 1 number, 1 special character, and 6+ characters."
      );
      return;
    }

    setError("");
    alert("✅ Registration successful!");
    navigate("/products"); // ✅ Redirect to ProductList
  };

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/admin">Admin Login</Link>
        </div>
      </nav>

      {/* 🔹 Register Section */}
      <div className="register-container">
        <h2>🆕 New here? Create an account to start shopping with us!</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
