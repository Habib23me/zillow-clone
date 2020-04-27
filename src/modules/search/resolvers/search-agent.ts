import Agent from "../../../models/agent";
import * as GoogleMapsHelper from "../../../utils/googleMaps";

const searchAgent = async (_, { input }) => {
  //base search query

  const query = Agent.query();

  if (input.address) {
    // Get parsed boundaries from google maps
    const boundaries = await GoogleMapsHelper.geocodeAddressToBoundaries(
      input.address
    );
    //add location check
    query
      .where("lat", ">", boundaries.southwest.lat)
      .where("lat", "<", boundaries.northeast.lat)
      .where("lng", ">", boundaries.southwest.lng)
      .where("lng", "<", boundaries.northeast.lng)
      .page(input.offset, input.first);
  }
  //If there are filter query's sanitize them and add to builder
  if (input.name) {
    query.where("brokerageName", "like", `%${input.name}%`);
  }

  //query search
  const result = await query;

  //return result
  return {
    ...result,
    offset: input.offset,
    first: input.first,
  };
};

export default searchAgent;
