import chalk from "chalk";
import express, { IRouter } from "express";

import backAccountController from "../../controllers/backAccount.controller";

const router: IRouter = express.Router();

router
  .route("/")
  .get(backAccountController.getAllBankAccounts)
  .post(backAccountController.createBankAccount);
  
router
  .route("/:id")
  .get(backAccountController.getBankAccountById)
  .delete(backAccountController.deleteBankAccount);

export default router;
