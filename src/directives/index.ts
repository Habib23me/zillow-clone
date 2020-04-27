import isAuthenticated from "./is-authenticated";
import isAgent from "./is-agent";

export default {
  typeDefs: [isAuthenticated.typeDef, isAgent.typeDef],
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive,
    isAgent: isAgent.directive,
  },
};
