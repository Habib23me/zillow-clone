import User from "../../../models/user";
import House from "../../../models/house";

const updateHouse = async (
  _,
  { input }: { input: House },
  { user }: { user: User }
) => {
  //fetch house
  const house = await House.query().findOne({
    id: input.id,
    listerId: user.id,
  });
  //If the house exists
  if (house) {
    // Validate No of bathrooms is a positive integer or .5 decimal
    if (
      input.noOfBathrooms &&
      (input.noOfBathrooms < 0 || (input.noOfBathrooms * 2) % 1 != 0)
    ) {
      throw Error("Invalid Number of Bathrooms");
    }
    // Validate No of bedrooms
    if (input.noOfBedrooms && input.noOfBedrooms < 0) {
      throw Error("Invalid Number of Bedrooms");
    }
    // Validate No of parking spots
    if (input.noOfParkingSpots && input.noOfParkingSpots < 0) {
      throw Error("Invalid Number of Parking Spots");
    }
    // Validate No of living area
    if (input.livingArea && input.livingArea < 0) {
      throw Error("Invalid living area");
    }

    //Validate year built
    if (input.yearBuilt && !(input.yearBuilt > 0 && input.yearBuilt < 9999)) {
      throw Error("Invalid Year built");
    } else {
      //If in the past
      const now = new Date();
      if (input.yearBuilt > now.getFullYear()) {
        throw Error("Invalid Year built");
      }
    }
    // Validate price
    if (input.price && input.price < 0) {
      throw Error("Invalid price");
    }
    delete input.id;
    //Patch the house values
    return await house.$query().patch(input).returning("*");
  } else {
    throw Error("Invalid House");
  }
};

export default updateHouse;
