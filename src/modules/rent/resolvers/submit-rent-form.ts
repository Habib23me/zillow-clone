import User from "../../../models/user";
import House from "../../../models/house";
import RentForm from "../../../models/rent-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { UserInputError } from "apollo-server-express";
import * as EmailValidator from "email-validator";

const submitRentForm = async (
  _,
  { input }: { input: RentForm },
  { user }: { user: User }
) => {
  //Verify Email and Phone number
  const phoneNumber = parsePhoneNumberFromString(input.phone);
  if (!phoneNumber.isValid()) {
    throw new UserInputError("Invalid Phone Number!");
  }
  input.phone = phoneNumber.number.toString();

  if (!EmailValidator.validate(input.email)) {
    throw new UserInputError("Invalid Email!");
  }

  //fetch house
  const house = await House.query().findById(input.houseId);

  //If house exists, is published
  if (house && house.isPublished) {
    if (house.homeStatus != 2) {
      throw Error("House not for rent!");
    }
    //Check if desired move date is in the future
    if (new Date() > input.desiredMoveInDate) {
      throw Error("Can't enter a passed date as a desired move in date!");
    }
    //validate desired duration
    if (input.desiredDuration < 0) {
      throw Error("Desired duration must be positive!");
    }
    //validate gross household income
    if (input.grossHouseholdIncome < 0) {
      throw Error("Gross Household Income must be positive!");
    }

    //Add Rent form
    return await RentForm.query().insert(input).returning("*");
  }
  throw Error("House not found!");
};

export default submitRentForm;
