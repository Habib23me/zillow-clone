const { gql } = require("apollo-server-express");

const { GraphQLUpload } = require("graphql-upload");

export default {
  typeDefs: [
    gql`
      scalar Upload
    `,
  ],
  resolvers: {
    Upload: GraphQLUpload,
  },
};
