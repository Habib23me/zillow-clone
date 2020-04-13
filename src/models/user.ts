import { Model, Modifiers } from "objection";
import Agent from "./agent";

export default class User extends Model {
  id!: number;
  email!: string;
  password!: string;
  firstName?: string;
  lastName?: string;
  username!: string;
  image?: string;
  role!: number;
  agentProfile?: Agent;

  static tableName = "user";

  static jsonSchema = {
    type: "object",
    required: ["email", "username", "role"],

    properties: {
      id: { type: "integer" },
      email: { type: "string", minLength: 1, maxLength: 255 },
      password: { type: "string", minLength: 1, maxLength: 255 },
      firstName: { type: "string", minLength: 1, maxLength: 255 },
      lastName: { type: "string", minLength: 1, maxLength: 255 },
      username: { type: "string", minLength: 1, maxLength: 255 },
      image: { type: "string" },
      role: { type: "integer" },
    },
  };

  static relationMappings = () => ({
    agentProfile: {
      relation: Model.HasOneRelation,
      modelClass: Agent,
      join: {
        from: "user.id",
        to: "agent.userId",
      },
    },
  });
}
