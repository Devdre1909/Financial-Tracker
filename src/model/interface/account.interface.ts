import mongoose from 'mongoose';

export enum AccountType {
  EDUCATION = 'EDUCATION',
  PARTY = 'PARTY',
  FINANCIAL = 'FINANCIAL FREEDOM',
  DAILY_NEEDS = 'DAILY NEEDS',
  GIVING = 'GIVING',
  LONG_TERM_SPENDING = 'LONG TERM SPENDING',
}

export interface IAccount extends mongoose.Document {
  name: string;
  accountType: AccountType;
  description: string;
  bankName: string;
  bankAccountNumber: string;
  accountPercentage: number;
  color: string
}