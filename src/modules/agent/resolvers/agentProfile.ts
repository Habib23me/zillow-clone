import User from "../../../models/user";

const agentProfile = async (_, args, { user }: { user: User }) => {
  return await user.$relatedQuery("agentProfile");
};

export default agentProfile;
