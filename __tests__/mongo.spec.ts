import mongoose, { Mongoose } from "mongoose";
import {
  AccountType,
  IAccount,
} from "../src/model/interface/account.interface";
import accountService from "../src/services/account.service";

describe("Mongodb Service", () => {
  let connection: typeof mongoose;

  beforeAll(async () => {
    connection = await mongoose.connect("mongodb://localhost:27017/test", {});
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  afterEach(async () => {
    await connection.connection.dropDatabase();
  });

  test("Get all bank accounts", async () => {
    const banks = await accountService.getAll();
    expect(banks.length).toBe(0);
  });

  test("Create bank account", async () => {
    const account: Partial<IAccount> = {
      name: "Test Account",
      accountType: AccountType.EDUCATION,
      description: "Test Account",
      bankName: "Test Bank Name",
      bankAccountNumber: "123456789",
      accountPercentage: 10,
      color: "#000000",
    };

    const newAccount = await accountService.create(account);
    const banks = await accountService.getAll();
    expect(banks.length).toBe(1);
    expect(newAccount.name).toBe(account.name);
  });
});
