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
    //get the total count of reviews the agent has
    async reviewCount(agent: Agent) {
      const count = await Review.query()
        .where("agentId", agent.userId)
        .count("id");
      return count[0].count;
    },
    async reviewAvg(agent: Agent) {
      //get the average agent rating
      const avg = await Review.query()
        .where("agentId", agent.userId)
        .avg("rating");
      return avg[0].avg;
    },
  },
};

export default resolvers;
