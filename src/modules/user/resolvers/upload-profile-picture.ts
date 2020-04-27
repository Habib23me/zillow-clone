import User from "../../../models/user";
import uploadImageStream from "../../../utils/upload";
import { ApolloError } from "apollo-server-express";

const uploadProfilePicture = async (
  parent,
  { file },
  { user }: { user: User }
) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  try {
    //upload image
    const result = await uploadImageStream(createReadStream(), "/user-images");
    //add image to database
    await user.$query().patch({
      image: result.public_id,
    });
    return {
      imagePath: result.public_id,
      fullURL: result.url,
    };
  } catch (error) {
    throw new ApolloError("Image Upload Failed");
  }
};

export default uploadProfilePicture;
