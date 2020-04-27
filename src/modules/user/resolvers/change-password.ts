import User from "../../../models/user";
import bcrypt from "bcrypt";
import config from "../../../utils/config";

import { validatePassword } from "../../../utils/validator";

const changePassword = async (_, { input }, { user }: { user: User }) => {
  //get user details for the current user
  user = await User.query().select("id", "password").findOne("id", user.id);

  //If password doesn't match return auth error
  if (!(await bcrypt.compare(input.oldPassword, user.password))) {
    throw new Error("Wrong password");
  }

  //validate password
  if (!validatePassword(input.newPassword)) {
    throw Error("Invalid New Password");
  }

  //change password in db
  if (
    await user.$query().patch({
      password: await bcrypt.hash(input.newPassword, config.SALT_ROUNDS),
    })
  ) {
    return true;
  }
  return false;
};

export default changePassword;
