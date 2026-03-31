import { Router } from 'express';
import { asyncHandler } from '../../middlewares/asyncHandlerMiddleware';
import { getStoreInfo } from '@/app/controller/storeController';

const storeRouter = Router();

storeRouter.get('/', asyncHandler(getStoreInfo));

export default storeRouter;
