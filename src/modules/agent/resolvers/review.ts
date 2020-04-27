import Review from "../../../models/review";

const review = async (_, args) => {
  //Get review info by it's id
  const review = await Review.query().findById(args.id);
  if (!review) {
    return Error("Review not found!");
  }
  return review;
};

export default review;
