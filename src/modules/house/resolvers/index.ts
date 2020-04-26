import addHouse from "./add-house";
import house from "./house";
import updateHouse from "./update-house";
import publishHouse from "./publish-house";
import unpublishHouse from "./unpublish-house";
import verifyAddress from "./verify-address";
import uploadHousePicture from "./upload-house-picture";
import removeHousePicture from "./remove-house-picture";

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
  },
};

export default resolvers;
