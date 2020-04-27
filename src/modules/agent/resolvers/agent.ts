import Agent from "../../../models/agent";

const agent = async (_, args) => {
  //Get agent info by it's id
  const agent = await Agent.query().findById(args.id);
  if (!agent) {
    return Error("Agent not found!");
  }
  return agent;
};

export default agent;
