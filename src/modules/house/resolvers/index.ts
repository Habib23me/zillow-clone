import addHouse from "./add-house";
import house from "./house";
import updateHouse from "./update-house";
import publishHouse from "./publish-house";
import unpublishHouse from "./unpublish-house";
import verifyAddress from "./verify-address";
import uploadHousePicture from "./upload-house-picture";
import removeHousePicture from "./remove-house-picture";
import saveHouse from "./save-house";
import removeSavedHouse from "./remove-saved-house";

import User from "../../../models/user";
import House from "../../../models/house";

const resolvers = {
  Query: {
    house,
    verifyAddress,
  },
  Mutation: {
    addHouse,
    updateHouse,
    publishHouse,
    unpublishHouse,
    uploadHousePicture,
    removeHousePicture,
    saveHouse,
    removeSavedHouse,
  },
  HomeStatus: {
    FOR_SALE: 1,
    FOR_RENT: 2,
    SOLD: 3,
  },
  HomeType: {
    HOUSES: 1,
    APARTMENT: 2,
    CONDOS: 3,
  },
  House: {
    //populate lister user data
    async lister(house: House) {
      return await User.query().findById(house.listerId);
    },
    //populate house images url
    async images(house: House) {
      return await House.relatedQuery("images").for(house.id);
    },
    //return a boolean checking if the current logged in user has the house saved or not
    async isSaved(house: House, args, { user }: { user: User }) {
      const relationExists = await House.relatedQuery("saved")
        .for(house.id)
        .where("userId", user.id);
      if (relationExists.length > 0) {
        return true;
      }
      return false;
    },
    //populate the different forms for the house and append them in one
    async forms(house: House) {
      const contactForms = await House.relatedQuery("contactForms").for(
        house.id
      );
      const rentForms = await House.relatedQuery("rentForms").for(house.id);
      const tourForms = await House.relatedQuery("tourForms").for(house.id);
      return [...contactForms, ...rentForms, ...tourForms];
    },
  },
};

export default resolvers;
