import searchHouse from "./search-house";
import saveSearch from "./save-search";
import removeSavedSearch from "./remove-saved-search";
import SavedSearch from "../../../models/saved-search";
import searchAgent from "./search-agent";
import savedSearch from "./saved-search";

import User from "../../../models/user";

const resolvers = {
  Query: {
    searchHouse,
    savedSearch,
    searchAgent,
  },
  Mutation: {
    saveSearch,
    removeSavedSearch,
  },
  SearchOrderTypes: {
    PRICE_ASC: "price.asc",
    PRICE_DESC: "price.desc",
    SQUARE_METER_ASC: "livingArea.desc",
    SQUARE_METER_DESC: "livingArea.desc",
    DAYS_ON_ZILLOW_ASC: "created_at.asc",
    DAYS_ON_ZILLOW_DESC: "created_at.desc",
  },
  SavedSearch: {
    //populate the user on a saved search
    async user(savedSearch: SavedSearch) {
      return await User.query().findOne("id", savedSearch.userId);
    },
  },
};

export default resolvers;
