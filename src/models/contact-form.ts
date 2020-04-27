import { Model, Modifiers } from "objection";
import House from "./house";

export default class ContactForm extends Model {
  id!: number;
  name!: string;
  email!: string;
  phone!: string;
  shortMessage?: string;
  houseId?: number;
  house?: House;
  created_at?: Date;
  isRead?: Boolean;

  createdAt() {
    return this.created_at;
  }

  formType() {
    return "ContactForm";
  }

  static tableName = "contactForm";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      name: { type: "string", minLength: 1, maxLength: 64 },
      email: { type: "string", minLength: 1, maxLength: 64 },
      phone: { type: "string", minLength: 1, maxLength: 16 },
      shortMessage: { type: "string", minLength: 1, maxLength: 256 },
      isRead: { type: "boolean" },
      houseId: { type: "integer" },
    },
  };

  static relationMappings = () => ({
    house: {
      relation: Model.BelongsToOneRelation,
      modelClass: House,
      join: {
        from: "contactForm.houseId",
        to: "house.id",
      },
    },
  });
}
