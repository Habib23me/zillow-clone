import { makeExecutableSchemaFromModules } from "../utils/modules";

import user from "./user";
import upload from "./upload";

export default makeExecutableSchemaFromModules({
  modules: [user, upload],
});
