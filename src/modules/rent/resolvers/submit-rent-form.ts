import User from "../../../models/user";
import House from "../../../models/house";
import RentForm from "../../../models/rent-form";
import {
  validatePhone,
  validateEmail,
  isDateInTheFuture,
  isPositive,
} from "../../../utils/validator";

const submitRentForm = async (_, { input }: { input: RentForm }) => {
  //Verify Email and Phone number
  input.phone = validatePhone(input.phone);
  input.email = validateEmail(input.email);

  //fetch house
  const house = await House.query().findById(input.houseId);

  //If house exists, is published
  if (house && house.isPublished) {
    if (house.homeStatus != 2) {
      throw Error("House not for rent!");
    }
    //Check if desired move date is in the future
    isDateInTheFuture(
      input.desiredMoveInDate,
      "Can't enter a passed date as a desired move in date!"
    );

    //validate desired duration
    isPositive(input.desiredDuration, "Desired duration must be positive!");

    //validate gross household income
    isPositive(
      input.grossHouseholdIncome,
      "Gross Household Income must be positive!"
    );

    //Add Rent form
    return await RentForm.query().insert(input).returning("*");
  }
  throw Error("House not found!");
};

export default submitRentForm;
