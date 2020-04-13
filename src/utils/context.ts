import User from "../models/user";
import config from "../utils/config";
import jsonwebtoken from "jsonwebtoken";
import express from "express";

import { AuthenticationError, ApolloServer } from "apollo-server-express";

const getUser = async (req: any) => {
  const token = req.headers.authorization;
  if (token) {
    const { username } = (await jsonwebtoken.verify(
      token,
      config.JWT_SECRET
    )) as { username: string };
    if (username) {
      const user = await User.query()
        .select("id", "username", "role")
        .findOne("username", "=", username);

      if (user) {
        return user;
      }
    }
  }
  return null;
};

export default {
  getUser,
};
