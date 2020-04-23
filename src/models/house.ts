import { Model, Modifiers } from "objection";
import User from "./user";

export default class House extends Model {
  id!: number;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
  price?: number;
  dateSold?: Date;
  noOfBathrooms?: number;
  noOfBedrooms?: number;
  noOfParkingSpots?: number;
  yearBuilt?: Date;
  isOpenHouse?: boolean;
  isPublished?: boolean;
  homeStatus?: number;
  homeType?: number;
  lister?: User;
  listerId!: number;

  static tableName = "house";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      streetAddress: { type: "string", minLength: 1, maxLength: 255 },
      city: { type: "string", minLength: 1, maxLength: 32 },
      state: { type: "string", minLength: 1, maxLength: 16 },
      zipCode: { type: "string", minLength: 1, maxLength: 16 },
      country: { type: "string", minLength: 1, maxLength: 32 },
      lat: { type: "float" },
      lng: { type: "float" },
      price: { type: "float" },
      dateSold: { type: "Date" },
      noOfBathrooms: { type: "float" },
      noOfBedrooms: { type: "integer" },
      noOfParkingSpots: { type: "integer" },
      yearBuilt: { type: "string", minLength: 4, maxLength: 4 },
      isOpenHouse: { type: "boolean" },
      isPublished: { type: "boolean" },
      homeStatus: { type: "integer" },
      homeType: { type: "integer" },
      listerId: { type: "integer" },
    },
  };

  static relationMappings = () => ({
    lister: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "house.listerId",
        to: "user.id",
      },
    },
  });
}
