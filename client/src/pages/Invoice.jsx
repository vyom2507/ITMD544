import { useEffect, useState } from "react";
import "../styles.css";

const Invoice = () => {
  const [cartItems, setCartItems] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("invoiceCart")) || [];

    setCartItems(storedCart);
    setDate(new Date().toLocaleDateString());
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-container">
      <h1>🧾 SwiftShop Invoice</h1>
      <p><strong>Date:</strong> {date}</p>
      <hr />

      {cartItems.length > 0 ? (
        <>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-total">
            <strong>Total Paid:</strong> ${total}
          </div>

          <button onClick={handlePrint} className="print-button">
            🖨️ Download / Print Invoice
          </button>
        </>
      ) : (
        <p>⚠️ No items to display in invoice.</p>
      )}
    </div>
  );
};

export default Invoice;
