import { Model, Modifiers } from "objection";
import User from "./user";
import Agent from "./agent";

export default class Review extends Model {
  id!: number;
  review!: string;
  rating!: number;
  agentId!: number;
  userId!: number;
  agent!: Agent;
  user!: User;
  count: number;
  avg: number;

  static tableName = "review";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      review: { type: "string", minLength: 1, maxLength: 256 },
      rating: { type: "integer" },
    },
  };

  static relationMappings = () => ({
    agent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Agent,
      join: {
        from: "review.agentId",
        to: "agent.userId",
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "review.userId",
        to: "user.id",
      },
    },
  });
}
