import express, { json } from 'express';
// import { saveDataToFile, setUsers } from './dataBase/dataBaseState';
import {
  SERVER_CLOSE_MESSAGE,
  SERVER_ERROR_CLOSE_MESSAGE,
  SERVER_RUNNING_MESSAGE,
} from './constants/messages';
import { userControllerPromise } from './config/config';
import { userRoutes } from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';

export async function startServer(port: string | number): Promise<void> {
  const app = express();

  app.use(json());

  const userController = await userControllerPromise;

  app.use('/api', userRoutes(userController));

  // Global error handler
  app.use(errorHandler);

  // Start the server
  const server = app.listen(port, () => {
    console.log(`${SERVER_RUNNING_MESSAGE} ${port}`);
  });

  // Handle errors
  server.on('error', () => {
    console.log(SERVER_ERROR_CLOSE_MESSAGE);
    // setUsers([]);
    // saveDataToFile();

    process.exit(1);
  });

  // Graceful shutdown (CTRL+C)
  process.on('SIGINT', () => {
    // setUsers([]);
    // saveDataToFile();

    server.close((err) => {
      if (err) {
        console.error(SERVER_ERROR_CLOSE_MESSAGE);
        process.exit(1);
      } else {
        console.log(SERVER_CLOSE_MESSAGE);
        process.exit(0);
      }
    });
  });
}
