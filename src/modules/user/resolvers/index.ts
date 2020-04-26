import me from "./me";
import login from "./login";
import signup from "./signup";
import uploadProfilePicture from "./upload-profile-picture";

import updateProfile from "./update-profile";
import User from "../../../models/user";
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
    async forms(user) {
      const houses = User.relatedQuery("houses").for(user.id);
      const contactForms = await House.relatedQuery("contactForms").for(houses);
      const rentForms = await House.relatedQuery("rentForms").for(houses);
      return [...contactForms, ...rentForms];
    },
  },
};

export default resolvers;
