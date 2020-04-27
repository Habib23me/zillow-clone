import { Model, Modifiers } from "objection";
import User from "./user";

export default class SavedSearch extends Model {
  id!: number;
  name!: String;
  searchQuery!: string;
  userId!: number;
  user!: User;

  static tableName = "savedSearch";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      name: { type: "string", minLength: 1, maxLength: 64 },
      searchQuery: { type: "json" },
    },
  };

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "savedSearch.userId",
        to: "user.id",
      },
    },
  });
}
