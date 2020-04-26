import User from "../../../models/user";
import ContactForm from "../../../models/contact-form";

const contactForm = async (_, args, { user }: { user: User }) => {
  //Fetch contact form
  const contactForm = await ContactForm.query()
    .findById(args.id)
    .withGraphFetched("house");

  //If contact form exists
  if (contactForm) {
    //And is sent to the current authenticated user
    if (user.id == contactForm.house.listerId) {
      return contactForm;
    }
  }
  //if it reach here then return an error
  throw Error("Contact Form not found!");
};

export default contactForm;
