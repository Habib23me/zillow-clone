import User from "../../../models/user";
import Image from "../../../models/image";
import uploadImageStream from "../../../utils/upload";
import { ApolloError } from "apollo-server-express";
import House from "../../../models/house";

const uploadHousePicture = async (
  parent,
  { input },
  { user }: { user: User }
) => {
  const { createReadStream, filename, mimetype, encoding } = await input.file;
  try {
    const house = await House.query().findById(input.houseId);
    //Check if the house exists
    if (house) {
      //Check if user is lister
      if (house.listerId == user.id) {
        //upload the image
        const result = await uploadImageStream(
          createReadStream(),
          "/house-images"
        );
        //add the image entry to db
        const image = await house.$relatedQuery("images").insert({
          imagePath: result.public_id,
        });
        return image;
      }
    }
  } catch (error) {
    throw new ApolloError("Image Upload Failed");
  }
};

export default uploadHousePicture;
