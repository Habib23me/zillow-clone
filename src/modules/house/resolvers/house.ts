import House from "../../../models/house";

const house = async (_, args) => {
  return await House.query().findById(args.id);
};

export default house;
