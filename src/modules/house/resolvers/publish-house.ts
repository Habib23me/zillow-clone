import User from "../../../models/user";
import House from "../../../models/house";

const publishHouse = async (_, args, { user }: { user: User }) => {
  const house = await House.query()
    .findById(args.id)
    .withGraphFetched("images");
  console.log(house.listerId);
  console.log(user.id);
  if (house) {
    if (house.listerId == user.id) {
      if (house.images.length == 0) {
        throw Error("You need to add at least one image before publishing");
      }
      if (!house.price || house.price == 0) {
        throw Error("You need to set price before publishing");
      }
      if (!house.homeStatus) {
        throw Error("You need to set home status before publishing");
      }
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
