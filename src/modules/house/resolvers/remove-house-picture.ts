import User from "../../../models/user";
import Image from "../../../models/image";

const removeHouseImages = async (_, args, { user }: { user: User }) => {
  //fetch the house
  const image = await Image.query()
    .findById(args.imageId)
    .withGraphFetched("house");
  //Check if the image and house exists
  if (image && image.house) {
    //Remove image
    await image.house
      .$relatedQuery("images")
      .for(image.house.id)
      .unrelate()
      .where("id", image.id);
    return image.house;
  }
  throw Error("Invalid Image or House ID");
};

export default removeHouseImages;
