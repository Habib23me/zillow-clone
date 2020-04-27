import User from "../../../models/user";
const agentProfile = async (_, args, { user }: { user: User }) => {
  //Get current logged in user's agent profile
  return await user.$relatedQuery("agentProfile");
};

export default agentProfile;
