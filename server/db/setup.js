import db from './database.js';

db.serialize(() => {
  // 🔹 Products Table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    )
  `);

  // 🔹 Seed Products
  db.run(`
    INSERT INTO products (name, brand, category, description, price, stock) VALUES 
    -- Laptops
    ('MacBook Pro', 'Apple', 'Laptop', 'M2 chip, 16GB RAM, 512GB SSD', 1999.99, 5),
    ('XPS 15', 'Dell', 'Laptop', 'High-performance ultrabook, 32GB RAM, 1TB SSD', 1799.99, 8),
    ('ThinkPad X1 Carbon', 'Lenovo', 'Laptop', 'Ultra-lightweight business laptop, 16GB RAM, 512GB SSD', 1599.99, 10),

    -- Mobile Phones
    ('iPhone 14 Pro', 'Apple', 'Mobile', 'Super Retina XDR display, A16 Bionic chip', 1099.99, 12),
    ('Galaxy S23 Ultra', 'Samsung', 'Mobile', 'Dynamic AMOLED 2X, Snapdragon 8 Gen 2', 999.99, 15),
    ('Pixel 7 Pro', 'Google', 'Mobile', 'Google Tensor G2, 120Hz display', 899.99, 10),

    -- Headphones
    ('AirPods Max', 'Apple', 'Headphones', 'High-fidelity audio, Active Noise Cancellation', 549.99, 5),
    ('WH-1000XM5', 'Sony', 'Headphones', 'Industry-leading noise cancellation', 399.99, 8),
    ('QC45', 'Bose', 'Headphones', 'Premium comfort, crystal-clear sound', 329.99, 6),

    -- Earphones
    ('AirPods Pro 2', 'Apple', 'Earphones', 'Adaptive Transparency, H2 chip', 249.99, 10),
    ('Galaxy Buds 2 Pro', 'Samsung', 'Earphones', '360 Audio, ANC', 229.99, 8),
    ('Echo Buds', 'Amazon', 'Earphones', 'Alexa built-in, wireless charging', 179.99, 12),

    -- Earbuds
    ('Beats Fit Pro', 'Beats', 'Earbuds', 'Secure-fit, spatial audio, ANC', 199.99, 10),
    ('Jabra Elite 7', 'Jabra', 'Earbuds', 'Waterproof, adjustable ANC', 179.99, 12),
    ('Soundcore Liberty 3', 'Anker', 'Earbuds', 'Hi-res audio, multi-mode noise cancellation', 149.99, 15)
  `);

  // 🔹 Admins Table
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // 🔹 Seed Admins
  db.run(`
    INSERT OR IGNORE INTO admins (username, password) VALUES 
    ('admin1', 'admin123'),
    ('admin2', 'admin456')
  `);
  

  // 🔹 Orders Table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_email TEXT NOT NULL,
      order_date TEXT DEFAULT CURRENT_TIMESTAMP,
      total REAL NOT NULL
    )
  `);

  // 🔹 Order Items Table
  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);
});

console.log('✅ Database setup complete.');
db.close();
