import isAuthenticated from "./is-authenticated";

export default {
  typeDefs: [isAuthenticated.typeDef],
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive
  }
};
