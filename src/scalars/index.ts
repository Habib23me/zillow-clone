import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { gql } from "apollo-server-express";

const typeDef = gql`
  scalar DateTime
  scalar Date
  scalar Time
`;

const DateTime = GraphQLDateTime;
const Date = GraphQLDate;
const Time = GraphQLTime;

export default {
  typeDefs: [typeDef],
  resolvers: {
    DateTime,
    Date,
    Time,
  },
};
