import User from "../../../models/user";
import House from "../../../models/house";
import TourForm from "../../../models/tour-form";
import {
  validatePhone,
  validateEmail,
  isDateInTheFuture,
} from "../../../utils/validator";
import { transaction } from "objection";

const submitTourForm = async (_, { input }) => {
  //fetch house
  const house = await House.query().findById(input.houseId);

  //If house exists and is published
  if (house && house.isPublished) {
    //If house is sold return an error
    if (house.homeStatus === 3) {
      throw Error("Sold houses can't be toured!");
    }

    //Verify Email and Phone number
    input.phone = validatePhone(input.phone);
    input.email = validateEmail(input.email);

    //check if there is at least one date
    if (input.dates.length == 0) {
      throw Error("At least one date is needed");
    }

    //check if the dates are in the future
    input.dates.forEach((tourDate) => {
      isDateInTheFuture(
        tourDate.date,
        "Tour Appointments must be in the future!"
      );
    });

    //start a transaction and insert the tour an it's dates
    return await transaction(TourForm.knex(), async (trx) => {
      return await TourForm.query(trx)
        .insertGraph(input, {
          relate: true,
        })
        .returning("*");
    });
  }
  throw Error("House not found!");
};

export default submitTourForm;
