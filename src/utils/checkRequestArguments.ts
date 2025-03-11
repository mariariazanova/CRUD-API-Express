import { sendJsonResponse } from './sendJsonResponse';
import { RestMethod } from '../enums/restMethod';
import {
  EMPTY_REQUIRED_FIELD_MESSAGE,
  IMPOSSIBLE_UPDATE_ID_MESSAGE,
  INCORRECT_DATA_FORMAT_MESSAGE,
  INCORRECT_FIELD_MESSAGE,
  INTERNAL_ERROR_MESSAGE,
  NO_USER_MESSAGE,
} from '../constants/messages';

const requiredKeys: Array<string> = ['name', 'email'];

export const checkRequestArguments = async (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  res: any,
  body: any,
  fn: (body: any, userId?: string) => Promise<any>,
  /* eslint-enable @typescript-eslint/no-explicit-any */
  method: RestMethod,
  userId?: string
) => {
  if (Object.keys(body).every((key: string) => requiredKeys.includes(key))) {
    if (requiredKeys.some((key) => !body[key])) {
      sendJsonResponse(res, undefined, 400, EMPTY_REQUIRED_FIELD_MESSAGE);
    } else if (requiredKeys.some((key) => typeof body[key] !== 'string')) {
      sendJsonResponse(res, undefined, 400, INCORRECT_DATA_FORMAT_MESSAGE);
    } else {
      try {
        const user = await fn(userId, body);

        if (method === RestMethod.Post) {
          sendJsonResponse(res, user, 201);
        } else {
          if (user) {
            sendJsonResponse(res, user);
          } else {
            sendJsonResponse(res, undefined, 404, NO_USER_MESSAGE);
          }
        }
      } catch {
        sendJsonResponse(res, undefined, 500, INTERNAL_ERROR_MESSAGE);
      }
    }
  } else {
    if (Object.keys(body).some((key: string) => key === 'id')) {
      sendJsonResponse(res, undefined, 400, IMPOSSIBLE_UPDATE_ID_MESSAGE);
    } else {
      sendJsonResponse(res, undefined, 400, INCORRECT_FIELD_MESSAGE);
    }
  }
};
