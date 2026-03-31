import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandlerMiddleware";
import { login, register } from "../app/controller/authController";

const authRouter = Router();

authRouter.post("/login", asyncHandler(login));
authRouter.post("/register", asyncHandler(register));

export default authRouter;
