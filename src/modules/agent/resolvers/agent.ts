import Agent from "../../../models/agent";

const agent = async (_, args) => {
  return await Agent.query().findById(args.id);
};

export default agent;
