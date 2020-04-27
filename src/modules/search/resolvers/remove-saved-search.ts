import User from "../../../models/user";
import House from "../../../models/house";
import SavedSearch from "../../../models/saved-search";

const removeSavedHouse = async (_, args, { user }: { user: User }) => {
  //fetch the saved search
  const savedSearch = await SavedSearch.query().findOne("id", args.id);
  //check if current user saved it
  if (savedSearch && savedSearch.userId == user.id) {
    //delete saved search
    return await SavedSearch.query().deleteById(args.id);
  }
  throw Error("Saved Search not found!");
};

export default removeSavedHouse;
