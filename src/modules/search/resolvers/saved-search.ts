import User from "../../../models/user";
import House from "../../../models/house";
import SavedSearch from "../../../models/saved-search";

const savedHouse = async (_, args, { user }: { user: User }) => {
  const search = await SavedSearch.query().findById(args.id);
  if (search && search.userId == user.id) {
    return search;
  }
  throw Error("Invalid Saved Search ID");
};

export default savedHouse;
