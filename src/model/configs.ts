import mongoose, { Model } from "mongoose";
import { IConfig } from "./interface/config.interface";

const configurationSchema = new mongoose.Schema<IConfig>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: mongoose.Schema.Types.Mixed,
});

const ConfigSchema: Model<IConfig> = mongoose.model(
  "Config",
  configurationSchema
);
export default ConfigSchema;
