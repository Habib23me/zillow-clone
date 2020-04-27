import { Model, Modifiers } from "objection";
import House from "./house";
import config from "../utils/config";

export default class Image extends Model {
  id!: number;
  imagePath!: string;
  house?: House;

  fullURL() {
    return config.CLOUDINARY_USER_URL + this.imagePath;
  }

  static tableName = "image";

  static jsonSchema = {
    type: "object",
    required: ["imagePath"],

    properties: {
      id: { type: "integer" },
      imagePath: { type: "string" },
    },
  };

  static relationMappings = () => ({
    house: {
      relation: Model.HasOneThroughRelation,
      modelClass: House,
      join: {
        from: "image.id",
        through: {
          from: "houseImage.imageId",
          to: "houseImage.houseId",
        },
        to: "house.id",
      },
    },
  });
}
