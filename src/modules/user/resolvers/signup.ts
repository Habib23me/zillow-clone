import { UserInputError } from "apollo-server-express";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import randomstring from "randomstring";
import config from "../../../utils/config";

import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "../../../utils/validator";
import { sendVerifyEmail } from "../../../utils/mailer";

const signup = async (_, { input }: { input: User }) => {
  // Check If email exists
  const user = await User.query()
    .select("id")
    .findOne("email", "=", input.email);
  // If email exists raise an error
  if (user) throw new UserInputError("Email Already Exists");

  //validate username and password and email
  if (input.username && !validateUsername(input.username)) {
    throw Error("Invalid Username");
  }
  if (!validatePassword(input.password)) {
    throw Error("Invalid Password");
  }
  validateEmail(input.email);

  //check if username is taken
  if (
    input.username &&
    (await User.query().findOne({
      username: input.username,
    }))
  ) {
    throw Error("Username already taken");
  }

  // If no user name is given generate one
  if (!input.username) {
    input.username = randomstring.generate(8);
  }

  //TODO change username generation to one that wouldn't cause
  //TODO conflicts in the future

  //Resolve role
  // Hash Password, Generate userName And Insert user to database
  input.password = await bcrypt.hash(input.password, config.SALT_ROUNDS);
  const newUser = await User.query().insert(input).returning("*");

  if (input.role == 2) {
    await newUser.$relatedQuery("agentProfile").insert({});
  }

  //send email verification email
  const token = jsonwebtoken.sign(
    {
      email: input.email,
    },
    config.JWT_VERIFICATION_PASSWORD_SECRET,
    { expiresIn: config.JWT_VERIFICATION_LIFE_TIME }
  );
  try {
    await sendVerifyEmail(input.email, token);
  } catch {}

  //Return Signed JWT
  return jsonwebtoken.sign(
    {
      email: input.email,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_LIFE_TIME }
  );
};

export default signup;
