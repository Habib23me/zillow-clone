import User from "../../../models/user";
import House from "../../../models/house";
import SavedSearch from "../../../models/saved-search";

const savedHouse = async (_, args, { user }: { user: User }) => {
  //fetch the saved search
  const search = await SavedSearch.query().findById(args.id);
  //check if current user saved it
  if (search && search.userId == user.id) {
    return search;
  }
  throw Error("Invalid Saved Search ID");
};

export default savedHouse;
