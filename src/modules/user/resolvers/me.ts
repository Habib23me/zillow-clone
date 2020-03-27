import User from "../../../models/user";

const me = async (_, args, { user }: { user: User }) => {
  return await User.query().findOne("username", "=", user.username);
};

export default me;
