import User from "../../../models/user";
import Image from "../../../models/image";
import uploadImageStream from "../../../utils/upload";
import { ApolloError } from "apollo-server-express";

const uploadHousePicture = async (
  parent,
  { file },
  { user }: { user: User }
) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  try {
    //Upload image
    const result = await uploadImageStream(createReadStream(), "/house-images");
    //Add image to database
    const image = await Image.query().insert({
      imagePath: result.public_id,
    });
    return {
      id: image.id,
      publicId: result.public_id,
      url: result.se0cure_url,
    };
  } catch (error) {
    throw new ApolloError("Image Upload Failed");
  }
};

export default uploadHousePicture;
