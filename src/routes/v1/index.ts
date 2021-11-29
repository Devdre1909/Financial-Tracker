import express, { IRouter } from "express";
import bankAccountRoutes from "./backAccount"
import configRoutes from "./config"

const router: IRouter = express.Router();

router.use(`/bank-account`, bankAccountRoutes);
router.use('/config', configRoutes)

export default router;