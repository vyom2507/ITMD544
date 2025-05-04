import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
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

const Stocks = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    price: "",
    availability: "",
  });

  useEffect(() => {
    if (data?.products) setFiltered(data.products);
  }, [data]);

  const handleFilter = () => {
    let results = data.products;

    if (filters.brand) {
      results = results.filter((p) =>
        p.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.category) {
      results = results.filter((p) =>
        p.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.price) {
      const max = parseFloat(filters.price);
      results = results.filter((p) => p.price <= max);
    }

    if (filters.availability === "in") {
      results = results.filter((p) => p.stock > 0);
    } else if (filters.availability === "out") {
      results = results.filter((p) => p.stock === 0);
    }

    setFiltered(results);
  };

  if (loading) return <p>Loading stock report...</p>;
  if (error) return <p>Error loading stock report: {error.message}</p>;

  return (
    <div className="stock-report-container">
      <h2>📦 SwiftStocks </h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Brand"
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />
        <select
          value={filters.availability}
          onChange={(e) =>
            setFilters({ ...filters, availability: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
        <button onClick={handleFilter}>Filter</button>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>📌 ID</th>
            <th>🛍️ Product</th>
            <th>🏷️ Brand</th>
            <th>📂 Category</th>
            <th>💲 Price</th>
            <th>📦 Stock</th>
            <th>📈 Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.stock}</td>
              <td>{item.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
