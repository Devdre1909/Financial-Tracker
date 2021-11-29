import express, { Request, Response } from "express";
import { Schema } from "mongoose";
import { removeAllListeners } from "process";
import { IAccount } from "../model/interface/account.interface";
import BankAccountService from "../services/account.service";
import configService from "../services/config.service";

class BankAccount {

  async getAllBankAccounts(req: Request, res: Response): Promise<void> {
    try {
      const accounts: IAccount[] =
        await BankAccountService.getAll();
      res.status(200).json(accounts);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getBankAccountById(req: Request, res: Response) {
    try {
      const account: IAccount | null =
        await BankAccountService.getById(req.params.id);
      res.status(200).json(account);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async createBankAccount(req: Request, res: Response) {
    try {
      const data: IAccount = req.body

      const remainingPercentage = await configService.getConfig("remaining_percentage")

      if (remainingPercentage < data.accountPercentage) {
        res.status(422).json("The percentage is too high")
        return
      }

      await configService.setConfig("remaining_percentage", Number(remainingPercentage) - Number(data.accountPercentage));

      const account: IAccount =
        await BankAccountService.create(data);
      res.status(201).json(account);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async deleteBankAccount(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const account: IAccount|null = await BankAccountService.delete(id)
      res.status(200).json(account)
    } catch (error) {
      
    }
  }

}

export default new BankAccount();
