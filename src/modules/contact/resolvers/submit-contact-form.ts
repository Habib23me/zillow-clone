import User from "../../../models/user";
import House from "../../../models/house";
import ContactForm from "../../../models/contact-form";
import { validatePhone, validateEmail } from "../../../utils/validator";

const submitContactForm = async (_, { input }: { input: ContactForm }) => {
  //Verify Email and Phone number

  //Verify Email and Phone number
  input.phone = validatePhone(input.phone);
  input.email = validateEmail(input.email);

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
