import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import config from "./config";

const uploadImageStream = (
  stream: any
): Promise<cloudinary.UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: config.CLOUDINARY_FOLDER + "/user-images",
        overwrite: false,
        format: "jpg",
        public_id: uuidv4(),
      },
      function (err, image) {
        if (image) {
          resolve(image);
        } else {
          reject(err);
        }
      }
    );
    stream.pipe(cld_upload_stream);
  });
};

export default uploadImageStream;
