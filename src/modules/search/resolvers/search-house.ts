import House from "../../../models/house";
import * as GoogleMapsHelper from "../../../utils/googleMaps";
import { isPositive, isGreaterThanZero } from "../../../utils/validator";

const searchHouse = async (_, { input }) => {
  // Get parsed boundaries from google maps
  const boundaries = await GoogleMapsHelper.geocodeAddressToBoundaries(
    input.queryString
  );

  //base search query
  const query = House.query()
    .where("lat", ">", boundaries.southwest.lat)
    .where("lat", "<", boundaries.northeast.lat)
    .where("lng", ">", boundaries.southwest.lng)
    .where("lng", "<", boundaries.northeast.lng)
    .where("isPublished", true)
    .page(input.offset, input.first);

  //If there are filter query's sanitize them and add to builder
  if (input.filter) {
    if (input.filter.homeStatus) {
      query.where("homeStatus", "=", input.filter.homeStatus);
    }
    if (input.filter.homeType) {
      query.where("homeType", "=", input.filter.homeType);
    }
    if (input.filter.minPrice) {
      isPositive(input.filter.minPrice, "Min Price Should Be Positive");
      query.where("price", ">", input.filter.minPrice);
    }
    if (input.filter.maxPrice) {
      isPositive(input.filter.max, "Max Price Should Be Positive");
      query.where("price", "<", input.filter.maxPrice);
    }
    if (input.filter.noOfBathrooms) {
      isPositive(
        input.filter.noOfBathrooms,
        "No of bathrooms Should Be Positive"
      );
      //validate no of bathrooms is an integer or a half
      if (
        input.filter.noOfBathrooms < 0 ||
        (input.filter.noOfBathrooms * 2) % 1 != 0
      ) {
        throw Error("Invalid Number of Bathrooms");
      }
      query.where("noOfBathrooms", "=", input.filter.noOfBathrooms);
    }
    if (input.filter.noOfBedrooms) {
      isPositive(
        input.filter.noOfBathrooms,
        "Number of Bathrooms Should Be Positive"
      );

      query.where("noOfBedrooms", "=", input.filter.noOfBedrooms);
    }
    if (input.filter.noOfParkingSpots) {
      isPositive(
        input.filter.noOfParkingSpots,
        "Number of Parking Spots Should Be Positive"
      );
      query.where("noOfParkingSpots", "=", input.filter.noOfParkingSpots);
    }
    if (input.filter.isOpenHouse) {
      query.where("isOpenHouse", "=", input.filter.isOpenHouse);
    }
    if (input.filter.minYearBuilt) {
      if (!(input.minYearBuilt > 0 && input.minYearBuilt < 9999)) {
        throw Error("Min year not valid");
      }
      query.where("yearBuilt", ">", input.filter.minYearBuilt);
    }

    if (input.filter.maxYearBuilt) {
      if (!(input.maxYearBuilt > 0 && input.maxYearBuilt < 9999)) {
        throw Error("Max year not valid");
      }
      query.where("yearBuilt", "<", input.filter.maxYearBuilt);
    }
    if (input.filter.minDaysOnZillow) {
      isPositive(
        input.filter.minDaysOnZillow,
        "Min days on Zillow should be positive"
      );
      const minDate = new Date();
      minDate.setDate(minDate.getDate() - input.filter.maxDaysOnZillow);
      query.where("created_at", "<", minDate);
    }

    if (input.filter.maxDaysOnZillow) {
      isPositive(
        input.filter.maxDaysOnZillow,
        "Max days on Zillow should be positive"
      );
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() - input.filter.maxDaysOnZillow);
      query.where("created_at", ">", maxDate);
    }

    if (input.filter.minSquareMeter) {
      isPositive(
        input.filter.minSquareMeter,
        "Min Square meter Should Be Positive"
      );
      query.where("livingArea", ">", input.filter.minSquareMeter);
    }
    if (input.filter.maxSquareMeter) {
      isPositive(
        input.filter.maxSquareMeter,
        "Min Square meter Should Be Positive"
      );
      query.where("livingArea", "<", input.filter.maxSquareMeter);
    }
  }

  //if order by exists add to query
  if (input.orderBy) {
    const orderByArray = input.orderBy.split(".");
    query.orderBy(orderByArray[0], orderByArray[1]);
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

export default searchHouse;
