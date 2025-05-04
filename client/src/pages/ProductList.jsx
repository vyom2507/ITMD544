import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      brand
      category
      description
      price
      stock
    }
  }
`;

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const navigate = useNavigate();

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("🛒 Item has been added to cart!");
    navigate("/cart");
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="product-list-container">
      <h2>🛍️ Explore Our Products</h2>
      <div className="product-grid">
        {data.products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {product.stock}</p>

            {product.stock === 0 ? (
              <button className="disabled-button" disabled>❌ Out of Stock</button>
            ) : (
              <button onClick={() => addToCart(product)}>➕ Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
