import { Model, Modifiers } from "objection";
import User from "./user";
import Image from "./image";
import ContactForm from "./contact-form";
import RentForm from "./rent-form";
import TourForm from "./tour-form";

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
  livingArea: number;
  dateSold?: Date;
  noOfBathrooms?: number;
  noOfBedrooms?: number;
  noOfParkingSpots?: number;
  yearBuilt?: number;
  isOpenHouse?: boolean;
  isPublished?: boolean;
  homeStatus?: number;
  homeType?: number;
  lister?: User;
  listerId!: number;
  images?: Image[];
  contactForms?: ContactForm[];
  created_at?: Date;
  saved?;

  daysListed() {
    const diffTime = Math.abs(this.created_at.getTime() - new Date().getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

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
      livingArea: { type: "float" },
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
    images: {
      relation: Model.ManyToManyRelation,
      modelClass: Image,
      join: {
        from: "house.id",
        through: {
          from: "houseImage.houseId",
          to: "houseImage.imageId",
        },
        to: "image.id",
      },
    },
    saved: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: "house.id",
        through: {
          from: "savedHouse.houseId",
          to: "savedHouse.userId",
        },
        to: "user.id",
      },
    },
    contactForms: {
      relation: Model.HasManyRelation,
      modelClass: ContactForm,
      join: {
        from: "house.id",
        to: "contactForm.houseId",
      },
    },
    rentForms: {
      relation: Model.HasManyRelation,
      modelClass: RentForm,
      join: {
        from: "house.id",
        to: "rentForm.houseId",
      },
    },
    tourForms: {
      relation: Model.HasManyRelation,
      modelClass: TourForm,
      join: {
        from: "house.id",
        to: "tourForm.houseId",
      },
    },
  });
}
