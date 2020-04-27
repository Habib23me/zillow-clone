import User from "../../../models/user";
import { ApolloError } from "apollo-server-express";

const updateProfile = async (
  _,
  { input }: { input: User },
  { user }: { user: User }
) => {
  // update user firstname and lastname
  return await user
    .$query()
    .patch({
      firstName: input.firstName,
      lastName: input.lastName,
    })
    .returning("*");
};

export default updateProfile;
