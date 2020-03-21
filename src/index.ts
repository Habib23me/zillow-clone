// import throng from "throng";
import app from "./app";
import config from "./utils/config";

const startServer = async function() {
  try {
    await Promise.all([app.listen(config.PORT)]);
    console.log(`Server has started on port: ${config.PORT}`);
  } catch (error) {
    console.error(`Could not start server: `, error);
  }
};
startServer();
