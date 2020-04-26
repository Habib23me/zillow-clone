import { Model, Modifiers } from "objection";
import User from "./user";

export default class Agent extends Model {
  userId!: number;
  phone?: string;
  brokerageName?: string;
  brokerageAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  licenseNumber?: string;
  licenceExpirationDate?: Date;
  website?: string;
  blog?: string;
  twitter?: string;
  linkedId?: string;
  user?: User;

  static idColumn = "userId";
  static tableName = "agent";

  static jsonSchema = {
    type: "object",

    properties: {
      userId: { type: "integer" },
      phone: { type: "string", minLength: 1, maxLength: 16 },
      brokerageName: { type: "string", minLength: 1, maxLength: 255 },
      brokerageAddress: { type: "string", minLength: 1, maxLength: 255 },
      city: { type: "string", minLength: 1, maxLength: 32 },
      state: { type: "string", minLength: 1, maxLength: 16 },
      zipCode: { type: "string", minLength: 1, maxLength: 16 },
      licenseNumber: { type: "string", minLength: 1, maxLength: 64 },
      licenceExpirationDate: { type: "Date" },
      website: { type: "string", minLength: 1, maxLength: 255 },
      blog: { type: "string", minLength: 1, maxLength: 255 },
      twitter: { type: "string", minLength: 1, maxLength: 255 },
      linkedId: { type: "string", minLength: 1, maxLength: 255 },
    },
  };

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "agent.userId",
        to: "user.id",
      },
    },
  });
}
