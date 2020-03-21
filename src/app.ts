import express from "express";
import { ApolloServer } from "apollo-server-express";
import context from "./utils/context";
import schema from "./modules";
import Knex from "knex";
import config from "./utils/config";

import { Model } from "objection";
import { graphqlUploadExpress } from "graphql-upload";

Model.knex(Knex(require("./database/knexfile")[config.NODE_ENV]));
const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await context.getUser(req),
  }),
  uploads: false,
});

const app = express();

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

server.applyMiddleware({
  path: "/",
  app,
});

export default app;
