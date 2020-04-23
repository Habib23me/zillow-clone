import User from "../../../models/user";

const me = async (_, args, { user }: { user: User }) => {
  return await user.$query().withGraphFetched("houses");
};

export default me;
