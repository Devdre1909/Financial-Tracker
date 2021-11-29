import mongoose from "mongoose";

// Create deposit or withdrawal enum
export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

export interface ITransaction extends mongoose.Document {
  title: string;
  amount: number;
  date: Date;
  description: string;
  type: TransactionType;
  accountId: mongoose.Schema.Types.ObjectId;
}
