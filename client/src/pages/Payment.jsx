import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "../styles.css";

const Payment = () => {
  //const navigate = useNavigate();

  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("✅ Payment Successful! You will receive your invoice in the mail");
   // navigate("/invoice"); // ✅ Redirect to Invoice page
  };

  return (
    <div className="payment-container">
      <h2>💳 Pay with Credit/Debit Card</h2>
      <form className="card-form" onSubmit={handlePayment}>
        <input
          type="text"
          name="cardholderName"
          placeholder="Cardholder Name"
          value={cardDetails.cardholderName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          maxLength="16"
          value={cardDetails.cardNumber}
          onChange={handleChange}
          required
        />
        <div className="card-row">
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            maxLength="5"
            value={cardDetails.expiryDate}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            maxLength="3"
            value={cardDetails.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <button className="pay-button" type="submit">
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
