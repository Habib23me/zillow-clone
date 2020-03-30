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
    const result = await uploadImageStream(createReadStream());
    await user.$query().patch({
      image: result.public_id,
    });
    return {
      publicId: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    throw new ApolloError("Image Upload Failed");
  }
};

export default uploadProfilePicture;
