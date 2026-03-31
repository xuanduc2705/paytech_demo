import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import notifyRouter from "./notification";

const appRouter = Router();

appRouter.use(authMiddleware);
appRouter.use("/notification", notifyRouter);

export default appRouter;
