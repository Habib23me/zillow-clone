import me from "./me";
import login from "./login";
import signup from "./signup";
import uploadProfilePicture from "./upload-profile-picture";

import updateProfile from "./update-profile";
import User from "../../../models/user";
import contactForm from "../../contact/resolvers/contact-form";
import ContactForm from "../../../models/contact-form";
import House from "../../../models/house";

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
    signup,
    uploadProfilePicture,
    updateProfile,
  },
  Role: {
    REGISTERED: 1,
    AGENT: 2,
  },
  User: {
    async houses(user) {
      return await User.relatedQuery("houses").for(user.id);
    },
    async contactForms(user) {
      const houses = User.relatedQuery("houses").for(user.id);
      return await House.relatedQuery("contactForms").for(houses);
    },
  },
};

export default resolvers;
