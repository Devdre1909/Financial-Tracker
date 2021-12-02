import express, { Request, Response } from "express";
import { Schema } from "mongoose";
import { removeAllListeners } from "process";
import { IAccount } from "../model/interface/account.interface";
import BankAccountService from "../services/account.service";
import configService from "../services/config.service";

class BankAccount {
  async getAllBankAccounts(req: Request, res: Response): Promise<void> {
    try {
      const accounts: IAccount[] = await BankAccountService.getAll();
      res.status(200).json(accounts);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async getBankAccountById(req: Request, res: Response) {
    try {
      const account: IAccount | null = await BankAccountService.getById(
        req.params.id
      );
      res.status(200).json(account);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async createBankAccount(this: BankAccount, req: Request, res: Response) {
    try {
      const data: IAccount = req.body;

      const isValidPercentage = this.validateRemainingPercentage(data);

      if (!isValidPercentage) {
        res.status(422).json({ message: "Percentage too high" });
      }

      await this.calculateRemaimingPercentageForNewAccount(data);

      const account: IAccount = await BankAccountService.create(data);
      res.status(201).json(account);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async updateBankAccount(req: Request, res: Response) {
    const data: IAccount = req.body;
    try {
      const account: IAccount & any = await BankAccountService.getById(
        req.params.id
      );

      if (account === null)
        res.status(404).json({ message: "Account not found" });

      const isValidPercentage = this.validateRemainingPercentage(data);

      if (!isValidPercentage) {
        res.status(422).json({ message: "Percentage too high" });
      }

      await this.calculateRemaimingPercentageForUpdateAccount(data);

      const updateAccount = await BankAccountService.update(
        req.params.id,
        account
      );

      res.status(200).json(updateAccount);
    } catch (error) {}
  }

  async deleteBankAccount(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const account: IAccount | null = await BankAccountService.delete(id);
      res.status(200).json(account);
    } catch (error) {}
  }

  private async validateRemainingPercentage(
    account: IAccount
  ): Promise<boolean> {
    const remainingPercentage = await configService.getConfig(
      "remaining_percentage"
    );

    if (remainingPercentage < account.accountPercentage) {
      return false;
    }

    return true;
  }

  private async calculateRemaimingPercentageForUpdateAccount(
    account: IAccount,
    changeToAccount?: IAccount
  ): Promise<void> {
    const remainingPercentage = await configService.getConfig(
      "remaining_percentage"
    );

    const presentAccountPercentage: number = account.accountPercentage;
    const updateAccountPercentage: number =
      changeToAccount?.accountPercentage ?? 0;

    if (presentAccountPercentage !== updateAccountPercentage) {
      let toAdd = presentAccountPercentage - updateAccountPercentage;
      await configService.setConfig(
        "remaining_percentage",
        remainingPercentage + toAdd
      );
    }

    await configService.setConfig(
      "remaining_percentage",
      Number(remainingPercentage) - presentAccountPercentage
    );
  }

  private async calculateRemaimingPercentageForNewAccount(
    account: IAccount
  ): Promise<void> {
    const remainingPercentage = await configService.getConfig(
      "remaining_percentage"
    );

    const presentAccountPercentage: number = account.accountPercentage;

    await configService.setConfig(
      "remaining_percentage",
      remainingPercentage - presentAccountPercentage
    );
  }
}

export default new BankAccount();
