import User from "../../../models/user";
import Agent from "../../../models/agent";
import { validatePhone, isValidUrl } from "../../../utils/validator";
import * as GoogleMapsHelper from "../../../utils/googleMaps";

const updateAgentProfile = async (
  _,
  { input }: { input: Agent },
  { user }: { user: User }
) => {
  //validate phone number
  if (input.phone) {
    validatePhone(input.phone);
  }

  //validate all the url inputs
  isValidUrl(input.linkedId, "Invalid LinkedIn url");
  isValidUrl(input.twitter, "Invalid Twitter url");
  isValidUrl(input.website, "Invalid Website url");
  isValidUrl(input.blog, "Invalid Blog url");

  //check if all address parts are present
  if (
    !input.brokerageAddress ||
    !input.city! ||
    !input.state ||
    !input.zipCode
  ) {
    throw Error("Address not complete");
  } else {
    // Get parsed address from google maps
    const address = await GoogleMapsHelper.geocodeAddress(
      input.brokerageAddress +
        "," +
        input.city +
        "," +
        input.state +
        " " +
        input.zipCode
    );
    //set lat and lng
    input.lat = address.lat;
    input.lng = address.lng;
  }

  //update agent profile of currently logged in user
  return await user
    .$relatedQuery("agentProfile")
    .patch(input)
    .first()
    .returning("*");
};

export default updateAgentProfile;
