import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const filteredCart = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>🛒 Your cart is empty.</h2>
        <Link to="/products">
          <button className="continue-btn">⬅️ Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛒 Your Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>
          <p>
            <strong>Price:</strong> ${item.price.toFixed(2)}
          </p>
          <p>
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <div className="cart-actions">
            <button onClick={() => updateQuantity(item.id, 1)}>➕</button>
            <button onClick={() => updateQuantity(item.id, -1)}>➖</button>
            <button onClick={() => removeItem(item.id)}>🗑️ Remove</button>
          </div>
        </div>
      ))}
      <h3>💰 Total: ${total}</h3>

      <div className="cart-buttons">
        <Link to="/products">
          <button className="continue-btn">⬅️ Continue Shopping</button>
        </Link>
        <Link to="/checkout">
          <button className="checkout-btn">✅ Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
