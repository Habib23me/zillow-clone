import User from "../../../models/user";

const isUsernameTaken = async (_, args) => {
  //check if username is already in use and return a boolean

  if (await User.query().findOne(args)) {
    return true;
  }
  return false;
};

export default isUsernameTaken;
