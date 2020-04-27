import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import config from "./config";

//Takes an image stream and a folder name
//generates a unique file name and uploads it to cloudinary
const uploadImageStream = (
  stream: any,
  folder: string
): Promise<cloudinary.UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: config.CLOUDINARY_FOLDER + folder,
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
