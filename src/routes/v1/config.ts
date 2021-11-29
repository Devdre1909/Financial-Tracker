import chalk from "chalk";
import express, { IRouter } from "express";

import configController from "../../controllers/config.controller";

const router: IRouter = express.Router();

router.route("/").get(configController.getAllConfigurations);

router
  .route("/:name")
  .get(configController.getConfigurationByName)
  .post(configController.setConfiguration)
  .delete(configController.deleteConfiguration);

export default router;
