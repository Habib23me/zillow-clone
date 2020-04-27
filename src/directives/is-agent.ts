import {
  gql,
  SchemaDirectiveVisitor,
  AuthenticationError,
} from "apollo-server-express";
import { defaultFieldResolver } from "graphql";

const typeDef = gql`
  directive @isAgent on FIELD_DEFINITION
`;

export class IsAgentDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args: any[]) {
      const context = args[2];

      if (context.user.role != 2) {
        throw new AuthenticationError("Only allowed for agents");
      }

      return resolve.apply(this, args);
    };
  }
}

export default {
  typeDef,
  directive: IsAgentDirective,
};
