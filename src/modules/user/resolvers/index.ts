import me from "./me";
import login from "./login";
import signup from "./signup";
import uploadProfilePicture from "./upload-profile-picture";

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
    signup,
    uploadProfilePicture,
  },
  Role: {
    REGISTERED: 1,
    AGENT: 2,
  },
};

export default resolvers;
