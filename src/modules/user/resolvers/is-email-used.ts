import User from "../../../models/user";

const isEmailUsed = async (_, args) => {
  if (await User.query().findOne(args)) {
    return true;
  }
  return false;
};

export default isEmailUsed;
