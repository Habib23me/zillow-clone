import me from "./me";
import login from "./login";
import signup from "./signup";
import uploadProfilePicture from "./upload-profile-picture";

import updateProfile from "./update-profile";

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
};

export default resolvers;
