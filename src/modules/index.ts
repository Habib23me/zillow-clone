import { makeExecutableSchemaFromModules } from "../utils/modules";

import user from "./user";
import upload from "./upload";
import agent from "./agent";
import house from "./house";
import contactForm from "./contact";
import rentForm from "./rent";
import form from "./form";
import tourForm from "./tour";

export default makeExecutableSchemaFromModules({
  modules: [user, upload, agent, house, form, contactForm, rentForm, tourForm],
});
