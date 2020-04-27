import searchHouse from "./search-house";

const resolvers = {
  Query: {
    searchHouse,
  },
  SearchOrderTypes: {
    PRICE_ASC: "price.asc",
    PRICE_DESC: "price.desc",
    SQUARE_METER_ASC: "livingArea.desc",
    SQUARE_METER_DESC: "livingArea.desc",
    DAYS_ON_ZILLOW_ASC: "created_at.asc",
    DAYS_ON_ZILLOW_DESC: "created_at.desc",
  },
};

export default resolvers;
