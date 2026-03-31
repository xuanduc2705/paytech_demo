import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import notifyRouter from './notification';
import storeRouter from './store';

const appRouter = Router();

appRouter.use(authMiddleware);
appRouter.use('/notification', notifyRouter);
appRouter.use('/store', storeRouter);

export default appRouter;
