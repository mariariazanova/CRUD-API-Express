import { ServerResponse } from 'http';
import { User } from '../interfaces/user';

export const sendJsonResponse = (
  res: ServerResponse,
  value?: User | User[] | undefined,
  statusCode = 200,
  message = ''
): void => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(value || { message }));
};
