import contactForm from "./contact-form";
import markContactFormAsRead from "./mark-contact-form-as-read";
import submitContactForm from "./submit-contact-form";
import ContactForm from "../../../models/contact-form";
import House from "../../../models/house";
import RentForm from "../../../models/rent-form";

const resolvers = {
  Query: {
    contactForm,
  },
  Mutation: {
    submitContactForm,
    markContactFormAsRead,
  },
  ContactForm: {
    //populate lister user data
    async house(contactForm: ContactForm) {
      return await House.query().findById(contactForm.houseId);
    },
  },
};

export default resolvers;
