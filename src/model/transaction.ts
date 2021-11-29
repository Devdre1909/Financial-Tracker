import mongoose, { Model } from "mongoose";
import {
  ITransaction,
  TransactionType,
} from "./interface/transaction.interface";

const transactionSchema = new mongoose.Schema<ITransaction>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
    enum: TransactionType,
  },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
});

const TransactionSchema: Model<ITransaction> = mongoose.model(
  "Transaction",
  transactionSchema
);
export default TransactionSchema;
