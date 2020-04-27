import {
  gql,
  SchemaDirectiveVisitor,
  AuthenticationError,
} from "apollo-server-express";
import { defaultFieldResolver } from "graphql";

const typeDef = gql`
  directive @isAuthenticated on FIELD_DEFINITION
`;

export class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args: any[]) {
      const context = args[2];

      //check for the user object in context and if it doesn't
      //raise not authenticated error
      if (!context || !context.user) {
        throw new AuthenticationError("Not Authenticated");
      }

      return resolve.apply(this, args);
    };
  }
}

export default {
  typeDef,
  directive: IsAuthenticatedDirective,
};
