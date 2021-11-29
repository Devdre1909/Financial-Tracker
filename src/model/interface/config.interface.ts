import mongoose from "mongoose";

export interface IConfig extends mongoose.Document {
  name?: string;
  value: mongoose.Schema.Types.Mixed;
}
