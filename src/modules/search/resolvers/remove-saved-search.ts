import User from "../../../models/user";
import House from "../../../models/house";
import SavedSearch from "../../../models/saved-search";

const removeSavedHouse = async (_, args, { user }: { user: User }) => {
  return await SavedSearch.query().deleteById(args.id);
};

export default removeSavedHouse;
