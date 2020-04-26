import User from "../../../models/user";
import House from "../../../models/house";
import ContactForm from "../../../models/contact-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { UserInputError } from "apollo-server-express";
import * as EmailValidator from "email-validator";

const submitContactForm = async (
  _,
  { input }: { input: ContactForm },
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
    if (house.homeStatus != 1) {
      throw Error("House not for sale!");
    }
    //Add Contact form
    return await ContactForm.query().insert(input).returning("*");
  }
  throw Error("House not found!");
};

export default submitContactForm;
