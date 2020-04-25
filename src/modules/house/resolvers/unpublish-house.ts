import User from "../../../models/user";
import House from "../../../models/house";

const unpublishHouse = async (_, args, { user }: { user: User }) => {
  const house = await House.query().findById(args.id);
  if (house) {
    if (house.listerId == user.id) {
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
