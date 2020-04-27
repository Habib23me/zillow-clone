import User from "../../../models/user";
import jsonwebtoken from "jsonwebtoken";
import config from "../../../utils/config";
import { sendPasswordEmail } from "../../../utils/mailer";

const sendPasswordResetEmail = async (_, args) => {
  const user = await User.query().findOne(args);
  if (!user) {
    throw Error("User account not found!");
  }
  const token = jsonwebtoken.sign(
    {
      email: user.email,
    },
    config.JWT_VERIFICATION_PASSWORD_SECRET,
    { expiresIn: config.JWT_VERIFICATION_LIFE_TIME }
  );
  try {
    await sendPasswordEmail(args.email, token);
  } catch {
    return false;
  }
  return true;
};

export default sendPasswordResetEmail;
