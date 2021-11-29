import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import chalk from "chalk";
import morgan from "morgan";

import connect from "./connect";
import router from "./routes";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("No PORT specified");
  process.exit(1);
}

const app: Application = express();

// App Configurations
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", router("v1"));
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Financial Plan API");
});

// Server Activation
const PORT: Number = parseInt(process.env.PORT, 10);
app.listen(PORT, () => {
  console.log(chalk.yellow(`Server is running on port ${PORT}`));
});

connect({ db: process.env.MONGO_URL || "" });

