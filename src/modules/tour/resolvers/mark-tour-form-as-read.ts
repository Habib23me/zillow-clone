import User from "../../../models/user";
import TourForm from "../../../models/tour-form";

const markTourFormAsRead = async (_, args, { user }: { user: User }) => {
  //Fetch tour form
  const tourForm = await TourForm.query()
    .findById(args.id)
    .withGraphFetched("house");

  //If contact form exists
  if (tourForm) {
    //And is sent to the current authenticated user
    if (user.id == tourForm.house.listerId) {
      return await tourForm.$query().patch({ isRead: true }).returning("*");
    }
  }
  //if it reach here then return an error
  throw Error("Tour Form not found!");
};

export default markTourFormAsRead;
