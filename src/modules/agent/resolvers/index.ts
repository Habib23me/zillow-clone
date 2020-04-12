import agentProfile from "./agentProfile";
import updateAgentProfile from "./update-agent-profile";

const resolvers = {
  Query: {
    agentProfile,
  },
  Mutation: {
    updateAgentProfile,
  },
};

export default resolvers;
