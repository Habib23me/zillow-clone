import User from "../../../models/user";
import House from "../../../models/house";

const publishHouse = async (_, args, { user }: { user: User }) => {
  //check if user has verified email
  if (!user.isVerified) {
    throw Error("Email needs to be verified before publishing house");
  }

  //fetch the house
  const house = await House.query()
    .findById(args.id)
    .withGraphFetched("images");

  //Check if the house exists
  if (house) {
    //Check if the user is the lister
    if (house.listerId == user.id) {
      //Check if it has any images
      if (house.images.length == 0) {
        throw Error("You need to add at least one image before publishing");
      }
      //Check if the price is set
      if (!house.price || house.price == 0) {
        throw Error("You need to set price before publishing");
      }
      //Check if the home status is set
      if (!house.homeStatus) {
        throw Error("You need to set home status before publishing");
      }
      //Check if the home type is set
      if (!house.homeType) {
        throw Error("You need to set home type before publishing");
      }

      if (!house.livingArea || house.livingArea == 0) {
        throw Error("You need to set living area before publishing");
      }
      //Finally set home as published
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
