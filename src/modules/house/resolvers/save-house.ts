import User from "../../../models/user";
import House from "../../../models/house";

const saveHouse = async (_, args, { user }: { user: User }) => {
  //fetch the house
  const house = await House.query().findById(args.houseId);

  //Check if the house exists and is visible
  if (house && house.isPublished) {
    //add house as saved
    const relationExists = await house
      .$relatedQuery("saved")
      .for(house.id)
      .where("userId", user.id);
    //If already saved ignore request
    if (relationExists.length > 0) {
      return house;
    }
    //add the house as saved
    await house.$relatedQuery("saved").relate(user);
    return house;
  }
  throw Error("Invalid House ID");
};

export default saveHouse;
