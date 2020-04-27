import User from "../../../models/user";
import RentForm from "../../../models/rent-form";

const markRentFormAsRead = async (_, args, { user }: { user: User }) => {
  //Fetch rent form
  const rentForm = await RentForm.query()
    .findById(args.id)
    .withGraphFetched("house");

  //If contact form exists
  if (rentForm) {
    //And is sent to the current authenticated user
    if (user.id == rentForm.house.listerId) {
      return await rentForm.$query().patch({ isRead: true }).returning("*");
    }
  }
  //if it reach here then return an error
  throw Error("Contact Form not found!");
};

export default markRentFormAsRead;
