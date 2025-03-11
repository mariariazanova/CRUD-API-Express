import { Response } from 'express';
import { User } from '../interfaces/user';

export const sendJsonResponse = (
  res: Response,
  value?: User | User[] | undefined,
  statusCode = 200,
  message = ''
): void => {
  res.status(statusCode).json(value || { error: message });
};
