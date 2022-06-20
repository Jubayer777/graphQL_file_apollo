const { ApolloServer } = require("apollo-server-express");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const path = require("path");
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.use(express.static(path.join(__dirname, "public")));
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connection successful");
    })
    .catch((err) => {
      console.log("connection error", err);
    });

  app.listen(process.env.PORT, () => {
    console.log(`This site is running`);
  });
}

startServer();
