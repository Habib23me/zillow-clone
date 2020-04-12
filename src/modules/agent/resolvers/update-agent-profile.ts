import User from "../../../models/user";
import Agent from "../../../models/agent";

const updateAgentProfile = async (
  _,
  { input }: { input: Agent },
  { user }: { user: User }
) => {
  return await user
    .$relatedQuery("agentProfile")
    .patch(input)
    .first()
    .returning("*");
};

export default updateAgentProfile;
