import User from "../../../models/user";
import Review from "../../../models/review";
import Agent from "../../../models/agent";

const addReview = async (_, { input }, { user }: { user: User }) => {
  if (user.role == 2) {
    throw Error("An agent can't write reviews!");
  }
  //check rating is between 1 and 5
  if (input.rating < 1 || input.rating > 5) {
    throw Error("Rating should be between 1 and 5");
  }
  //Check if agent exists
  if (await Agent.query().findOne("userId", input.agentId)) {
    //Add review
    return await Review.query()
      .insert({
        userId: user.id,
        agentId: input.agentId,
        review: input.review,
        rating: input.rating,
      })
      .returning("*");
  }
  throw Error("Invalid Agent ID!");
};

export default addReview;
