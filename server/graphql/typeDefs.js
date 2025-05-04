import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    brand: String!
    category: String!
    description: String!
    price: Float!
    stock: Int!
  }

  type Order {
    id: ID!
    user_email: String!
    order_date: String
    total: Float!
  }

  type OrderItem {
    id: ID!
    order_id: Int!
    product_id: Int!
    quantity: Int!
  }

  type Admin {
    id: ID!
    username: String!
    password: String!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    getAllOrders: [Order]
  }

  type Mutation {
    adminLogin(username: String!, password: String!): Boolean
    placeOrder(user_email: String!, total: Float!): Order
    addOrderItem(order_id: Int!, product_id: Int!, quantity: Int!): OrderItem
  }
`;

export default typeDefs;
