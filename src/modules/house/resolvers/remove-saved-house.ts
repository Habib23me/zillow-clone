import User from "../../../models/user";
import House from "../../../models/house";

const removeSavedHouse = async (_, args, { user }: { user: User }) => {
  //fetch the house
  const house = await House.query().findById(args.houseId);

  //Check if the house exists and is visible
  if (house && house.isPublished) {
    //remove house from saved
    await house.$relatedQuery("saved").unrelate().where("id", user.id);
    return house;
  }
  throw Error("Invalid House ID");
};

export default removeSavedHouse;
