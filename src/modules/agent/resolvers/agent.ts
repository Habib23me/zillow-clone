import Agent from "../../../models/agent";

const agent = async (_, args) => {
  //Get agent info by it's id
  return await Agent.query().findById(args.id);
};

export default agent;
