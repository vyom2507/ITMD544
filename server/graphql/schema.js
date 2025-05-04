import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    brand: String!
    category: String!
    description: String!
    price: Float!
    stock: Int!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }
`;
