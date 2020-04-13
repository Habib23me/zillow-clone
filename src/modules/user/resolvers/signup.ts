import { UserInputError } from "apollo-server-express";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import randomstring from "randomstring";
import config from "../../../utils/config";
import Agent from "../../../models/agent";

const SALT_ROUNDS = 12;

const signup = async (_, { input }: { input: User }) => {
  // Check If email exists
  const user = await User.query()
    .select("id")
    .findOne("email", "=", input.email);
  // If email exists raise an error
  if (user) throw new UserInputError("Email Already Exists");

  console.log(input);
  // If no user name is given generate one
  if (!input.username) {
    input.username = randomstring.generate(8);
  }

  //Resolve role
  // Hash Password, Generate userName And Insert user to database
  input.password = await bcrypt.hash(input.password, SALT_ROUNDS);
  const newUser = await User.query().insert(input).returning("*");

  console.log(newUser.id);

  if (input.role == 2) {
    await newUser.$relatedQuery("agentProfile").insert({});
  }

  //Return Signed JWT
  return jsonwebtoken.sign(
    {
      username: input.username,
    },
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export default signup;
