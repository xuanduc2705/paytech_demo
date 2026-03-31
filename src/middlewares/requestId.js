import { v4 as uuid } from 'uuid';

export const requestId = (req, res, next) => {
  req.id = uuid();
  res.setHeader('X-Request-Id', req.id);
  next();
};
