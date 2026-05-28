import { Router, type IRouter } from "express";
import healthRouter from "./health";
import sitelockRouter from "./sitelock";

const router: IRouter = Router();

router.use(healthRouter);
router.use(sitelockRouter);

export default router;
