import chalk from "chalk";
import express, {IRouter} from "express";

const router: IRouter = express.Router();

const routes = (apiVersion: string): IRouter => {
  console.log(chalk.bgYellow.black(`Using Routes for ${apiVersion} ...`));
  router.use(`/${apiVersion}`, require(`./${apiVersion}`).default);
  return router;
}

export default routes;