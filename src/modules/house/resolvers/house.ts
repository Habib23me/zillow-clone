import House from "../../../models/house";

const house = async (_, args) => {
  //return the house that has the id
  return await House.query().findById(args.id);
};

export default house;
