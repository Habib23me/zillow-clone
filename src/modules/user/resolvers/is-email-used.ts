import User from "../../../models/user";

const isEmailUsed = async (_, args) => {
  //check if email address is already in use and return a boolean
  if (await User.query().findOne(args)) {
    return true;
  }
  return false;
};

export default isEmailUsed;
