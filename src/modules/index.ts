import { makeExecutableSchemaFromModules } from "../utils/modules";

import user from "./user";
import upload from "./upload";
import agent from "./agent";
import house from "./house";
import contactForm from "./contact";

export default makeExecutableSchemaFromModules({
  modules: [user, upload, agent, house, contactForm],
});
