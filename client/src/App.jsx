import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Cart from "./pages/Cart"; 
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import AdminLogin from './pages/AdminLogin';
import Stocks from './pages/Stocks';

//import Invoice from "./pages/Invoice";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/receipt" element={<Payment />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Stocks />} />

              </Routes>
    </Router>
  );
}

export default App;
