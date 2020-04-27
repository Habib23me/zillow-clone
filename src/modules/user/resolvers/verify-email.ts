import User from "../../../models/user";
import config from "../../../utils/config";
import jsonwebtoken from "jsonwebtoken";

const verifyEmail = async (_, args, { user }: { user: User }) => {
  const { email } = (await jsonwebtoken.verify(
    args.verificationToken,
    config.JWT_VERIFICATION_PASSWORD_SECRET
  )) as { email: string };
  if (!email) {
    throw Error("Invalid Token");
  }

  //check if emails match
  const userFromToken = await User.query()
    .select("id", "email")
    .findOne("email", "=", email);

  if (!userFromToken && !(userFromToken.email == user.email)) {
    throw Error("Invalid Token");
  }

  //set is verified boolean to true on db
  return userFromToken
    .$query()
    .patch({
      isVerified: true,
    })
    .returning("*");
};

export default verifyEmail;
