import User from "../../../models/user";
import House from "../../../models/house";

const unpublishHouse = async (_, args, { user }: { user: User }) => {
  const house = await House.query().findById(args.id);

  //Check if the house exists
  if (house) {
    //Check if the user is the lister
    if (house.listerId == user.id) {
      //Finally set home as unpublished
      return await house
        .$query()
        .patch({
          isPublished: false,
        })
        .returning("*");
    }
    throw Error("House can only be unpublished by lister");
  }
  throw Error("Invalid House ID");
};

export default unpublishHouse;
