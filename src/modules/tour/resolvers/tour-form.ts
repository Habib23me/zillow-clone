import User from "../../../models/user";
import TourForm from "../../../models/tour-form";

const tourForm = async (_, args, { user }: { user: User }) => {
  //Fetch tour form
  const tourForm = await TourForm.query()
    .findById(args.id)
    .withGraphFetched("house");

  //If tour form exists
  if (tourForm) {
    //And is sent to the current authenticated user
    if (user.id == tourForm.house.listerId) {
      return tourForm;
    }
  }
  //if it reach here then return an error
  throw Error("Tour Form not found!");
};

export default tourForm;
