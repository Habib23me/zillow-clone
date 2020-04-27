import tourForm from "./tour-form";
import markTourFormAsRead from "./mark-tour-form-as-read";
import submitTourForm from "./submit-tour-form";
import House from "../../../models/house";
import TourForm from "../../../models/tour-form";
import TourDate from "../../../models/tour-date";

const resolvers = {
  Query: {
    tourForm,
  },
  Mutation: {
    submitTourForm,
    markTourFormAsRead,
  },
  TourForm: {
    //populate house data on form
    async house(tourForm: TourForm) {
      return await House.query().findById(tourForm.houseId);
    },
    //populate the tour dates
    async dates(tourForm: TourForm) {
      return await TourForm.relatedQuery("dates").for(tourForm.id);
    },
  },
  TourTime: {
    MORNING: 1,
    AFTERNOON: 2,
    EVENING: 3,
  },
};

export default resolvers;
