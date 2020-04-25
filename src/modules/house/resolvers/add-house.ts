import User from "../../../models/user";
import House from "../../../models/house";
import { transaction } from "objection";
import * as GoogleMapsHelper from "../../../utils/googleMaps";

const addHouse = async (
  _,
  { input }: { input: House },
  { user }: { user: User }
) => {
  // Get parsed address from google maps
  const address = await GoogleMapsHelper.geocodeAddress(
    input.streetAddress +
      "," +
      input.city +
      "," +
      input.state +
      " " +
      input.zipCode
  );
  // Check if the house is already listed
  const alreadyExists = await House.query().findOne({
    streetAddress: address.streetAddress,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
  });
  // If it is then throw an error
  if (alreadyExists) {
    throw Error("House already listed");
  }
  // Validate No of bathrooms is a positive integer or .5 decimal
  if (input.noOfBathrooms < 0 || (input.noOfBathrooms * 2) % 1 != 0) {
    throw Error("Invalid Number of Bathrooms");
  }
  // Validate No of bedrooms
  if (input.noOfBedrooms < 0) {
    throw Error("Invalid Number of Bedrooms");
  }
  // Validate No of parking spots
  if (input.noOfParkingSpots < 0) {
    throw Error("Invalid Number of Parking Spots");
  }
  // Validate No of living area
  if (input.livingArea < 0) {
    throw Error("Invalid living area");
  }
  // Validate price
  if (input.price < 0) {
    throw Error("Invalid price");
  }

  //replace the address by the parsed one
  input.city = address.city;
  input.zipCode = address.zipCode;
  //if lat and lng not given as input also replace those
  if (!input.lat || !input.lng) {
    input.lat = address.lat;
    input.lng = address.lng;
  }
  input.streetAddress = address.streetAddress;
  input.country = address.country;

  //start a transaction for inserting the house and it's images
  return await transaction(House.knex(), async (trx) => {
    return await user
      .$relatedQuery("houses", trx)
      .insertGraph(input, {
        relate: true,
      })
      .returning("*");
  });
};

export default addHouse;
