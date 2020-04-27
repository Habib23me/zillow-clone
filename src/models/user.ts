import { Model, Modifiers } from "objection";
import Agent from "./agent";
import House from "./house";
import Review from "./review";
import SavedSearch from "./saved-search";

export default class User extends Model {
  id!: number;
  email!: string;
  password!: string;
  firstName?: string;
  lastName?: string;
  username!: string;
  image?: string;
  role!: number;
  isVerified!: Boolean;
  agentProfile?: Agent;
  houses?: House[];
  savedHouses?: House[];
  reviewsSubmitted?: Review[];
  savedSearch?: SavedSearch[];

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
      isVerified: { type: "boolean" },
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
    houses: {
      relation: Model.HasManyRelation,
      modelClass: House,
      join: {
        from: "user.id",
        to: "house.listerId",
      },
    },
    savedHouses: {
      relation: Model.ManyToManyRelation,
      modelClass: House,
      join: {
        from: "user.id",
        through: {
          from: "savedHouse.userId",
          to: "savedHouse.houseId",
        },
        to: "house.id",
      },
    },
    reviewsSubmitted: {
      relation: Model.HasManyRelation,
      modelClass: Review,
      join: {
        from: "user.id",
        to: "review.userId",
      },
    },
    savedSearches: {
      relation: Model.HasManyRelation,
      modelClass: SavedSearch,
      join: {
        from: "user.id",
        to: "savedSearch.userId",
      },
    },
  });
}
