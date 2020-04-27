import User from "../../../models/user";

import { validateUsername } from "../../../utils/validator";

const changeUsername = async (_, args, { user }: { user: User }) => {
  //check if username already taken
  if (await User.query().findOne(args)) {
    throw Error("Username already taken!");
  }
  //validate username
  if (!validateUsername(args.username)) {
    throw Error("Invalid Username");
  }

  //update username
  return await user.$query().patch(args).returning("*");
};

export default changeUsername;
