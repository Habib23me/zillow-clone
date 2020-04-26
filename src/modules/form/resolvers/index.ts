import ContactForm from "../../../models/contact-form";
import RentForm from "../../../models/rent-form";

const resolvers = {
  Form: {
    __resolveType(form: ContactForm | RentForm) {
      return form.formType();
    },
  },
  FormType: {
    CONTACT_FORM: "ContactForm",
    RENT_FORM: "RentForm",
    TOUR_FORM: "TourForm",
  },
};

export default resolvers;
