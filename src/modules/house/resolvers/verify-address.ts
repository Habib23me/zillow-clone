import User from "../../../models/user";
import House from "../../../models/house";

import * as GoogleMapsHelper from "../../../utils/googleMaps";

const verifyHouse = async (
  _,
  { input }: { input: GoogleMapsHelper.Address }
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
  return {
    ...address,
    house: alreadyExists,
  };
};

export default verifyHouse;
