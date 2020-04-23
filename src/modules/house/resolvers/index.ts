import addHouse from "./add-house";
import house from "./house";
import updateHouse from "./update-house";
import publishHouse from "./publish-house";
import unpublishHouse from "./unpublish-house";

const resolvers = {
  Query: {
    house,
  },
  Mutation: {
    addHouse,
    updateHouse,
    publishHouse,
    unpublishHouse,
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
};

export default resolvers;
