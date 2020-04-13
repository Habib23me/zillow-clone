import { makeExecutableSchemaFromModules } from "../utils/modules";

import user from "./user";
import upload from "./upload";
import agent from "./agent";

export default makeExecutableSchemaFromModules({
  modules: [user, upload, agent],
});
