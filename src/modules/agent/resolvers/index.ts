import agentProfile from "./agentProfile";
import updateAgentProfile from "./update-agent-profile";
import agent from "./agent";

const resolvers = {
  Query: {
    agentProfile,
    agent,
  },
  Mutation: {
    updateAgentProfile,
  },
};

export default resolvers;
