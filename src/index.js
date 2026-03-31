import http from 'http';
import app from './app';
import { config } from './config/env';
export const logger = {
  info: console.log,
  error: console.error,
};
const server = http.createServer(app);
const { PORT } = config;

server.listen(PORT, () => {
  logger.info(`MILO running on port ${PORT}`);
});
