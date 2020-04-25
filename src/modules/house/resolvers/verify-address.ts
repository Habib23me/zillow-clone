import User from "../../../models/user";
import House from "../../../models/house";

import * as GoogleMapsHelper from "../../../utils/googleMaps";

const verifyHouse = async (
  _,
  { input }: { input: GoogleMapsHelper.Address }
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
  return {
    ...address,
    house: alreadyExists,
  };
};

export default verifyHouse;
