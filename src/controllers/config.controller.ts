import express, { Request, Response } from "express";
import { Schema } from "mongoose";
import { IConfig } from "../model/interface/config.interface";
import ConfigurationService from "../services/config.service";

class ConfigurationController {
  async getAllConfigurations(req: Request, res: Response): Promise<void> {
    try {
      const configs: IConfig[] = await ConfigurationService.getAllConfigs();
      res.status(200).json(configs);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getConfigurationByName(req: Request, res: Response): Promise<void> {
    try {
      const config: IConfig | null = await ConfigurationService.getConfig(
        req.params.name
      );
      res.status(200).json(config);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async setConfiguration(req: Request, res: Response): Promise<void> {
    try {
      const config: IConfig | null = await ConfigurationService.setConfig(
        req.params.name,
        req.body
      );
      res.status(200).json(config);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async deleteConfiguration(req: Request, res: Response): Promise<void> {
    try {
      const config: IConfig | null = await ConfigurationService.deleteConfig(
        req.params.name
      );
      res.status(200).json(config);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async deleteAllConfigurations(req: Request, res: Response): Promise<void> {
    try {
      const configs: IConfig[] = await ConfigurationService.deleteAllConfigs();
      res.status(200).json(configs);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}

export default new ConfigurationController();
