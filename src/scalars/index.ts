import DateTime from "./date-time";

export default {
  typeDefs: [DateTime.typeDef],
  resolvers: {
    ...DateTime.resolvers
  }
};
