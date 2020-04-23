import User from "../../../models/user";
import House from "../../../models/house";

const publishHouse = async (_, args, { user }: { user: User }) => {
  const house = await House.query().findById(args.id);
  if (house) {
    if (house.lister.id == user.id) {
      return await house
        .$query()
        .patch({
          isPublished: true,
        })
        .returning("*");
    }
    throw Error("House can only be published by lister");
  }
  throw Error("Invalid House ID");
};

export default publishHouse;
