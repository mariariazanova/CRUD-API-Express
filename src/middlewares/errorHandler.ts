import { Request, Response } from 'express';
import { sendJsonResponse } from '../utils/sendJsonResponse';
import { INTERNAL_ERROR_MESSAGE } from '../constants/messages';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response
): void => {
  console.error(err);
  sendJsonResponse(res, undefined, 500, INTERNAL_ERROR_MESSAGE);
};
