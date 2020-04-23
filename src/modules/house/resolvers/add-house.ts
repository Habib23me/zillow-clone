import User from "../../../models/user";
import House from "../../../models/house";

import * as GoogleMapsHelper from "../../../utils/googleMaps";

const addHouse = async (
  _,
  { input }: { input: House },
  { user }: { user: User }
) => {
  const address = await GoogleMapsHelper.geocodeAddress(
    input.streetAddress +
      "," +
      input.city +
      "," +
      input.state +
      " " +
      input.zipCode
  );
  const alreadyExists = await House.query().findOne({
    streetAddress: address.streetAddress,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
  });
  if (alreadyExists) {
    throw Error("House already listed");
  }
  if ((input.noOfBathrooms * 2) % 1 != 0) {
    throw Error("Invalid Number of Bathrooms");
  }
  input.city = address.city;
  input.zipCode = address.zipCode;
  if (!input.lat || !input.lng) {
    input.lat = address.lat;
    input.lng = address.lng;
  }
  input.streetAddress = address.streetAddress;
  input.country = address.country;
  console.log(input);
  return await user.$relatedQuery("houses").insert(input);
};

export default addHouse;
