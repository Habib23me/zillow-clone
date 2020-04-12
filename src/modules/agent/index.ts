const { gql } = require("apollo-server-express");

import { importSchema } from "graphql-import";

import resolvers from "./resolvers";
import fs from "fs";
import path from "path";

const schemaFile = path.join(__dirname, "schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf8");
export default {
  typeDefs: [typeDefs],
  resolvers,
};
