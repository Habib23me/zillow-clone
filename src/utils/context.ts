import User from "../models/user";
import config from "../utils/config";
import jsonwebtoken from "jsonwebtoken";

//get user from db and add it to context if header exits
const getUser = async (req: any) => {
  const token = req.headers.authorization;
  if (token) {
    const { email } = (await jsonwebtoken.verify(token, config.JWT_SECRET)) as {
      email: string;
    };
    if (email) {
      const user = await User.query()
        .select("id", "username", "email", "role", "isVerified")
        .findOne("email", "=", email);

      if (user) {
        return user;
      }
    }
  }
  return null;
};

export default {
  getUser,
};
