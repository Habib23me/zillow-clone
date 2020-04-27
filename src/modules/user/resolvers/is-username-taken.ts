import User from "../../../models/user";

const isUsernameTaken = async (_, args) => {
  if (await User.query().findOne(args)) {
    return true;
  }
  return false;
};

export default isUsernameTaken;
