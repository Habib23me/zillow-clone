import User from "../../../models/user";
import jsonwebtoken from "jsonwebtoken";
import config from "../../../utils/config";

const sendPasswordResetEmail = async (_, args) => {
  const user = await User.query().findOne(args);
  if (!user) {
    throw Error("User account not found!");
  }
  console.log(
    jsonwebtoken.sign(
      {
        email: user.email,
      },
      config.JWT_RESET_PASSWORD_SECRET,
      { expiresIn: config.JWT_RESET_PASSWORD_LIFE_TIME }
    )
  );
  return true;
};

export default sendPasswordResetEmail;
