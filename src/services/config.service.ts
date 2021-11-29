import mongoose from "mongoose";
import ConfigSchema from "../model/configs";

class ConfigurationService {
  async getConfig(name: string): Promise<any> {
    const config = await ConfigSchema.findOne({ name: name || "" });
    return config?.value;
  }

  async setConfig(name: string, value: any): Promise<any> {
    const config = await ConfigSchema.findOneAndUpdate(
      { name: name },
      { name: name || "", value: value },
      { upsert: true, new: true }
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
    return config;
  }

  async deleteAllConfigs(): Promise<any> {
    await ConfigSchema.deleteMany({});
  }
}

export default new ConfigurationService();
