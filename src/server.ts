import { createServer, IncomingMessage, ServerResponse, Server } from 'http';
import { handleRequest } from './routes/userRoutes';
import { sendJsonResponse } from './utils/sendJsonResponse';
import { saveDataToFile, setUsers } from './dataBase/dataBaseState';
import {
  INTERNAL_ERROR_MESSAGE,
  SERVER_CLOSE_MESSAGE,
  SERVER_ERROR_CLOSE_MESSAGE,
  SERVER_RUNNING_MESSAGE,
} from './constants/messages';

export const startServer = (port: string | number): Server => {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    try {
      handleRequest(req, res).then();
    } catch {
      sendJsonResponse(res, undefined, 500, INTERNAL_ERROR_MESSAGE);
    }
  });

  server.listen(port, () => {
    console.log(`${SERVER_RUNNING_MESSAGE} ${port}`);
  });

  server.on('error', () => {
    console.log(SERVER_ERROR_CLOSE_MESSAGE);
    setUsers([]);
    saveDataToFile();

    process.exit(1);
  });

  process.on('SIGINT', () => {
    setUsers([]);
    saveDataToFile();

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

  return server;
};
