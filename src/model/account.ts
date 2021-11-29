import mongoose, { Model } from "mongoose";
import { AccountType, IAccount } from "./interface/account.interface";

const accountSchema = new mongoose.Schema<IAccount>(
  {
    name: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: AccountType,
    },
    description: String,
    bankName: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
    },
    accountPercentage: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    color: { type: mongoose.Schema.Types.String, required: true },
  },
  {
    timestamps: true,
  }
);

const AccountSchema: Model<IAccount> = mongoose.model("Account", accountSchema);
export default AccountSchema;
