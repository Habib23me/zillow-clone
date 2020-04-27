import me from "./me";
import login from "./login";
import signup from "./signup";
import uploadProfilePicture from "./upload-profile-picture";

import updateProfile from "./update-profile";
import User from "../../../models/user";
import House from "../../../models/house";
import isUsernameTaken from "./is-username-taken";
import isEmailUsed from "./is-email-used";

const resolvers = {
  Query: {
    me,
    isUsernameTaken,
    isEmailUsed,
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
    async houses(user: User) {
      return await User.relatedQuery("houses").for(user.id);
    },
    async forms(user: User) {
      const houses = User.relatedQuery("houses").for(user.id);
      const contactForms = await House.relatedQuery("contactForms").for(houses);
      const rentForms = await House.relatedQuery("rentForms").for(houses);
      const tourForms = await House.relatedQuery("tourForms").for(houses);
      return [...contactForms, ...rentForms, ...tourForms];
    },
    async savedHouses(user: User) {
      return await User.relatedQuery("savedHouses").for(user.id);
    },
  },
};

export default resolvers;
