import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandlerMiddleware";
import { listNotification } from "../../app/controller/notificationController";

const notifyRouter = Router();

notifyRouter.get("/", asyncHandler(listNotification));

export default notifyRouter;
