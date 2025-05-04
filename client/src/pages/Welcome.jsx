import { Link } from "react-router-dom";
import "../styles.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <nav className="navbar">
        <h2>SwiftShop 🛍️</h2>
        <div className="nav-links">
          <Link to="/register">Register</Link>
          <Link to="/shipping">Shipping Status</Link>
          <Link to="/admin">Admin Login</Link>
        </div>
      </nav>

      <h1>👋 Welcome to SwiftShop</h1>
      <p>Your one-stop solution for tech essentials 🖥️📱🎧</p>

      <div className="section-box">
        <h2>🛍️ About Us</h2>
        <p>We sell top-rated laptops, mobiles, and accessories from premium brands.</p>
      </div>

      <div className="section-box">
        <h2>👨‍💻 Developed By</h2>
        <p>Desinged by Vyom Limbachiya.</p>
      </div>

      <div className="section-box">
        <h2>🌟 Customer Reviews</h2>
        <p>“Fast delivery and top quality!” – ⭐ Priya</p>
        <p>“Smooth UI and great support.” – 💬 Rohan</p>
      </div>

      <div className="section-box">
        <h2>📦 Products We Offer</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>💻 MacBooks & Dell XPS</li>
          <li>📱 iPhones, Galaxies, Pixels</li>
          <li>🎧 AirPods, Bose, Sony</li>
        </ul>
      </div>

      <Link to="/products">
        <button className="cta-button">🛒 Start Shopping</button>
      </Link>
    </div>
  );
};

export default Welcome;
