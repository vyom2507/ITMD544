import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { open } from "sqlite"; // <-- this uses the async wrapper around sqlite3
import typeDefs from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";


dotenv.config();

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // ✅ Setup SQLite (with promises)
  const db = await open({
    filename: "./db/database.sqlite",
    driver: sqlite3.Database,
  });
  console.log("✅ Connected to SQLite database");

  // ✅ Enable CORS
  app.use(cors());

  // ✅ Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({}),

  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
};

startServer();
