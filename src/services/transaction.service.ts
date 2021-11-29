import mongoose from "mongoose";
import transactionSchema from "../model/transaction";
import {
  ITransaction,
  TransactionType,
} from "../model/interface/transaction.interface";

class Transaction {
  async getAll(): Promise<ITransaction[]> {
    const req = await transactionSchema.find({});
    return req;
  }

  async getById(
    id: mongoose.Schema.Types.ObjectId
  ): Promise<ITransaction | null> {
    const req = await transactionSchema.findById(id);
    return req;
  }

  async create(transaction: ITransaction): Promise<ITransaction> {
    const req = await transactionSchema.create(transaction);
    return req;
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    transaction: ITransaction
  ): Promise<ITransaction | null> {
    const req = await transactionSchema.findByIdAndUpdate(id, transaction);
    return req;
  }

  async delete(
    id: mongoose.Schema.Types.ObjectId
  ): Promise<ITransaction | null> {
    const req = await transactionSchema.findByIdAndDelete(id);
    return req;
  }

  async deleteAll(): Promise<ITransaction[] | null> {
    await transactionSchema.deleteMany({});
    return null;
  }

  async getByAccountId(
    accountId: mongoose.Schema.Types.ObjectId
  ): Promise<ITransaction[] | null> {
    const req = await transactionSchema.find({ accountId: accountId });
    return req;
  }

  async getByAccountIdAndDate(
    accountId: mongoose.Schema.Types.ObjectId,
    date: Date
  ): Promise<ITransaction[] | null> {
    const req = await transactionSchema.find({
      accountId: accountId,
      date: date,
    });
    return req;
  }

  async getByAccountIdAndDateRange(
    accountId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date
  ): Promise<ITransaction[] | null> {
    const req = await transactionSchema.find({
      accountId: accountId,
      date: { $gte: startDate, $lte: endDate },
    });
    return req;
  }

  async getByAccountIdAndDateRangeAndType(
    accountId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date,
    type: TransactionType
  ): Promise<ITransaction[] | null> {
    const req = await transactionSchema.find({
      accountId: accountId,
      date: { $gte: startDate, $lte: endDate },
      type: type,
    });
    return req;
  }

  async getBalanceByAccountId(
    accountId: mongoose.Schema.Types.ObjectId
  ): Promise<Number> {
    const req = await transactionSchema.aggregate([
      {
        $match: {
          accountId: accountId,
        },
      },
      {
        $group: {
          _id: null,
          balance: { $sum: "$amount" },
        },
      },
    ]);
    return req[0].balance;
  }

  async getBalanceByAccountIdAndTransactionType(
    accountId: mongoose.Schema.Types.ObjectId,
    type: TransactionType
  ): Promise<Number> {
    const req = await transactionSchema.aggregate([
      {
        $match: {
          accountId: accountId,
          type: type,
        },
      },
      {
        $group: {
          _id: null,
          balance: { $sum: "$amount" },
        },
      },
    ]);
    return req[0].balance;
  }
}

export default new Transaction();
