import mongoose from "mongoose";
import ConfigSchema from "../model/configs";

class ConfigurationService {
  async getConfig(name: string): Promise<any> {
    const config = await ConfigSchema.findOne({ name: name || "" });
    return config?.value;
  }

  async setConfig(
    name: string,
    value: mongoose.Schema.Types.Mixed
  ): Promise<any> {
    const config = await ConfigSchema.findOneAndUpdate(
      { name: name },
      { name: name || "", value: value },
      { upsert: true }
    );
    return config;
  }

  async getAllConfigs(): Promise<any> {
    const configs = await ConfigSchema.find();
    return configs;
  }

  async deleteConfig(name: string): Promise<any> {
    const config = await ConfigSchema.findOne({ name });
    if (config) {
      await config.remove();
    }
  }

  async deleteAllConfigs(): Promise<any> {
    await ConfigSchema.deleteMany({});
  }

}

export default new ConfigurationService();
