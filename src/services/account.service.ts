import mongoose from "mongoose";
import AccountSchema from "../model/account";
import { IAccount } from "../model/interface/account.interface";

class Account {

  async getAll(): Promise<IAccount[]> {
    const req = await AccountSchema.find({});
    return req;
  }

  async getById(id: string): Promise<IAccount|null> {
    const req = await AccountSchema.findById(id);
    return req;
  }

  async create(account: Partial<IAccount>): Promise<IAccount> {
    const req = await AccountSchema.create(account);
    return req;
  }

  async update(id: string, account: IAccount): Promise<IAccount|null> {
    const req = await AccountSchema.findByIdAndUpdate(id, account, { upsert: false, new: true });
    return req;
  }

  async delete(id: string): Promise<IAccount|null> {
    const req = await AccountSchema.findByIdAndRemove(id);
    return req;
  }

}


export default new Account();