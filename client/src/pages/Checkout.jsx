import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleConfirm = () => {
    if (!address.trim()) {
      setError("⚠️ Shipping address is required.");
      return;
    }

    alert("✅ Order confirmed! Redirecting to receipt...");
    localStorage.removeItem("cart");
    navigate("/receipt", {
      state: {
        cart: cartItems,
        address,
        total,
      },
    });
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">🧾 Confirm Your Order</h2>

      <div className="checkout-wrapper">
        {/* Cart Summary */}
        <div className="checkout-card">
          <h3>🛍️ Items in Cart</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <div>
                <strong>{item.name}</strong> × {item.quantity}
              </div>
              <div>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <hr />
          <h4>Total: 💵 ${total}</h4>
        </div>

        {/* Shipping Form */}
        <div className="checkout-card">
          <h3>🚚 Shipping Details</h3>
          <textarea
            placeholder="Enter your shipping address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={5}
            className="address-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button className="confirm-btn" onClick={handleConfirm}>
            ✅ Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
