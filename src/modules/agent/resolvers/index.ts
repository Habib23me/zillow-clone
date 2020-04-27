import agentProfile from "./agent-profile";
import addReview from "./add-review";
import updateAgentProfile from "./update-agent-profile";
import agent from "./agent";
import review from "./review";
import Review from "../../../models/review";
import Agent from "../../../models/agent";

const resolvers = {
  Query: {
    agentProfile,
    agent,
    review,
  },
  Mutation: {
    updateAgentProfile,
    addReview,
  },
  Review: {
    //populate lister user data
    async user(review: Review) {
      return await review.$relatedQuery("user");
    },
    //populate lister user data
    async agent(review: Review) {
      return await review.$relatedQuery("agent");
    },
  },
  Agent: {
    async reviewCount(agent: Agent) {
      const count = await Review.query()
        .where("agentId", agent.userId)
        .count("id");
      if (count[0]) {
        return count[0].count;
      }
      return 0;
    },
    async reviewAvg(agent: Agent) {
      const avg = await Review.query()
        .where("agentId", agent.userId)
        .avg("rating");
      if (avg[0]) {
        return avg[0].avg;
      }
      return 0;
    },
  },
};

export default resolvers;
