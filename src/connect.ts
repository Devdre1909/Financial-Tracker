import mongoose from "mongoose";
import chalk from "chalk";

type TInput = {
  db: string
};

export default async ({ db }: TInput) => {
  console.log(chalk.yellowBright("Connecting to database..."));
  const connect = () => {
    mongoose
      .connect(db, {})
      .then(() => {
        return console.log(chalk.green(`Successfully connected to ${db}`));
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnected", connect);
};
