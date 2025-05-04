import db from '../db/database.js';

export const resolvers = {
  Query: {
    products: () => {
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM products', (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    },

    product: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    },

    getAllOrders: () => {
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM orders', (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    },
  },

  Mutation: {
    adminLogin: (_, { username, password }) => {
      return new Promise((resolve, reject) => {
        db.get(
          'SELECT * FROM admins WHERE username = ? AND password = ?',
          [username, password],
          (err, row) => {
            if (err) reject(err);
            else resolve(!!row);
          }
        );
      });
    },

    placeOrder: (_, { user_email, total }) => {
      return new Promise((resolve, reject) => {
        const date = new Date().toISOString();
        db.run(
          'INSERT INTO orders (user_email, order_date, total) VALUES (?, ?, ?)',
          [user_email, date, total],
          function (err) {
            if (err) reject(err);
            else {
              resolve({
                id: this.lastID,
                user_email,
                order_date: date,
                total,
              });
            }
          }
        );
      });
    },

    addOrderItem: (_, { order_id, product_id, quantity }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)',
          [order_id, product_id, quantity],
          function (err) {
            if (err) reject(err);
            else {
              resolve({
                id: this.lastID,
                order_id,
                product_id,
                quantity,
              });
            }
          }
        );
      });
    },
  },
};
