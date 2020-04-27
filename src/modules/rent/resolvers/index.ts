import rentForm from "./rent-form";
import markRentFormAsRead from "./mark-rent-form-as-read";
import submitRentForm from "./submit-rent-form";
import RentForm from "../../../models/contact-form";
import House from "../../../models/house";

const resolvers = {
  Query: {
    rentForm,
  },
  Mutation: {
    submitRentForm,
    markRentFormAsRead,
  },
  RentForm: {
    //populate lister user data
    async house(rentForm: RentForm) {
      return await House.query().findById(rentForm.houseId);
    },
  },
};

export default resolvers;
