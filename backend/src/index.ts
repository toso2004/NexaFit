import express from 'express';
import * as UserRouter from './routes/user.routes';
import { openPool } from './utils/db.util';
import { logger } from "./utils/logger.util";

const startServer = async () => {
  const app = express();
  app.use(express.json());

  // Constants
  const PORT = process.env.PORT || 3003;

  app.use('/', UserRouter.router);

  // Listening
  app.listen(PORT, async () => {
    logger.info(`Listening in PORT: ${PORT}`);

    await openPool();
  });
};

// Initialize
startServer();