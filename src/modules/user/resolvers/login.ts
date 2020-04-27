import { AuthenticationError } from "apollo-server-express";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import config from "../../../utils/config";

const login = async (_, { input }: { input: User }) => {
  const user = await User.query()
    .select("email", "username", "password")
    .findOne("email", "=", input.email);

  //If user not found return auth error
  if (!user) {
    throw new AuthenticationError("Wrong username or password");
  }

  //If password doesn't match return auth error
  if (!(await bcrypt.compare(input.password, user.password))) {
    throw new AuthenticationError("Wrong username or password");
  }

  //Return Signed JWT
  return jsonwebtoken.sign(
    {
      email: user.email,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_LIFE_TIME }
  );
};

export default login;
