import User from "../../../models/user";
import House from "../../../models/house";
import SavedSearch from "../../../models/saved-search";

const saveHouse = async (_, { input }, { user }: { user: User }) => {
  //save search
  return await user.$relatedQuery("savedSearches").insert(input).returning("*");
};

export default saveHouse;
