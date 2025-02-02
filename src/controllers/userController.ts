import { IncomingMessage, ServerResponse } from 'http';
import {
  createUserInDb,
  deleteUserInDb,
  getAllUsersFromDb,
  getUserByIdFromDb,
  updateUserInDb,
} from '../services/userService';
import { sendJsonResponse } from '../utils/sendJsonResponse';
import { parseRequestBody } from '../utils/parseRequestBody';
import { getIdFromUrl } from '../utils/urlUtils';
import { isValidUUID } from '../utils/validationUtils';
import { checkRequestArguments } from '../utils/checkRequestArguments';
import { RestMethod } from '../enums/restMethod';
import {
  INVALID_JSON_MESSAGE,
  INVALID_USER_MESSAGE,
  NO_USER_MESSAGE,
} from '../constants/messages';

export const getAllUsers = (res: ServerResponse): void => {
  const users = getAllUsersFromDb();

  sendJsonResponse(res, users);
};

export const getUserById = (res: ServerResponse, pathName: string): void => {
  const userId = getIdFromUrl(pathName);
  const isIdValid = isValidUUID(userId);

  if (isIdValid) {
    const user = getUserByIdFromDb(userId);

    if (user) {
      sendJsonResponse(res, user);
    } else {
      sendJsonResponse(res, undefined, 404, NO_USER_MESSAGE);
    }
  } else {
    sendJsonResponse(res, undefined, 400, INVALID_USER_MESSAGE);
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await parseRequestBody(req);

    checkRequestArguments(
      res,
      body,
      () => createUserInDb(body),
      RestMethod.Post
    );
  } catch {
    sendJsonResponse(res, undefined, 400, INVALID_JSON_MESSAGE);
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  pathName: string
) => {
  const userId = getIdFromUrl(pathName);
  const isIdValid = isValidUUID(userId);

  if (isIdValid) {
    try {
      const body = await parseRequestBody(req);

      checkRequestArguments(
        res,
        body,
        () => updateUserInDb(body, userId),
        RestMethod.Put
      );
    } catch {
      sendJsonResponse(res, undefined, 400, INVALID_JSON_MESSAGE);
    }
  } else {
    sendJsonResponse(res, undefined, 400, INVALID_USER_MESSAGE);
  }
};

export const deleteUser = (res: ServerResponse, pathName: string) => {
  const userId = getIdFromUrl(pathName);
  const isIdValid = isValidUUID(userId);

  if (isIdValid) {
    const isUserDeleted = deleteUserInDb(userId);

    if (isUserDeleted) {
      sendJsonResponse(res, undefined, 204);
    } else {
      sendJsonResponse(res, undefined, 404, NO_USER_MESSAGE);
    }
  } else {
    sendJsonResponse(res, undefined, 400, INVALID_USER_MESSAGE);
  }
};
