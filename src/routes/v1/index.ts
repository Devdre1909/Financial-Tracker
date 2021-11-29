import express, { IRouter } from "express";
import bankAccountRoutes from "./backAccount"

const router: IRouter = express.Router();

router.use(`/bank-account`, bankAccountRoutes);

export default router;