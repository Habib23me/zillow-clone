import { Model, Modifiers } from "objection";
import House from "./house";

export default class Image extends Model {
  id!: number;
  imagePath!: string;

  static tableName = "image";

  static jsonSchema = {
    type: "object",
    required: ["imagePath"],

    properties: {
      id: { type: "integer" },
      imagePath: { type: "string" },
    },
  };
}
