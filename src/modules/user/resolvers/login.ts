import { AuthenticationError } from "apollo-server-express";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import config from "../../../utils/config";

const login = async (_, { input }: { input: User }) => {
  const user = await User.query()
    .select("username", "password")
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
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export default login;
