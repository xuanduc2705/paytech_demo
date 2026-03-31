import authRouter from "./auth";
import appRouter from "./app";
import cookieParser from "cookie-parser";
import { requestId } from "../middlewares/requestId";
import { requestLogger } from "../middlewares/requestLogger";
import { errorHandler } from "../middlewares/errorHandler";

export const routes = (app) => {
  app.use(requestId);
  app.use(requestLogger);
  app.use(cookieParser());
  app.use("/auth", authRouter);
  app.use("/app", appRouter);
  app.get("/", async (req, res) => res.json(`Welcome to paytech`));
  app.use(errorHandler);
};
