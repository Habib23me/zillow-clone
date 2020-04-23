import User from "../../../models/user";
import House from "../../../models/house";

const updateHouse = async (
  _,
  { input }: { input: House },
  { user }: { user: User }
) => {
  const house = await House.query().findOne({
    id: input.id,
    listerId: user.id,
  });

  delete input.id;
  if (house) {
    return await house.$query().patch(input).returning("*");
  } else {
    throw Error("Invalid House");
  }
};

export default updateHouse;
