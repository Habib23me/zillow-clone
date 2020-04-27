import User from "../../../models/user";
import jsonwebtoken from "jsonwebtoken";
import config from "../../../utils/config";
import { sendVerifyEmail } from "../../../utils/mailer";

const resendVerificationEmail = async (_, __, { user }: { user: User }) => {
  const token = jsonwebtoken.sign(
    {
      email: user.email,
    },
    config.JWT_VERIFICATION_PASSWORD_SECRET,
    { expiresIn: config.JWT_VERIFICATION_LIFE_TIME }
  );
  try {
    await sendVerifyEmail(user.email, token);
  } catch {
    return false;
  }
  return true;
};

export default resendVerificationEmail;
