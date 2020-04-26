import User from "../../../models/user";
import RentForm from "../../../models/rent-form";

const rentForm = async (_, args, { user }: { user: User }) => {
  //Fetch rent form
  const rentForm = await RentForm.query()
    .findById(args.id)
    .withGraphFetched("house");

  //If rent form exists
  if (rentForm) {
    //And is sent to the current authenticated user
    if (user.id == rentForm.house.listerId) {
      return rentForm;
    }
  }
  //if it reach here then return an error
  throw Error("Rent Form not found!");
};

export default rentForm;
