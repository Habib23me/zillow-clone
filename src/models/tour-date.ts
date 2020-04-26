import { Model, Modifiers } from "objection";
import TourForm from "./tour-form";

export default class TourDate extends Model {
  id!: number;
  date!: Date;
  time!: number;
  tourId!: number;
  tour!: TourForm;

  static tableName = "tourDate";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      date: { type: "date" },
      time: { type: "integer" },
      tourId: { type: "integer" },
    },
  };

  static relationMappings = () => ({
    tour: {
      relation: Model.BelongsToOneRelation,
      modelClass: TourForm,
      join: {
        from: "tourDate.tourId",
        to: "tourForm.id",
      },
    },
  });
}
