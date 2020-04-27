import agentProfile from "./agent-profile";
import addReview from "./add-review";
import updateAgentProfile from "./update-agent-profile";
import agent from "./agent";
import review from "./review";
import Review from "../../../models/review";

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
};

export default resolvers;
