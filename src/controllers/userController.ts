import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import {
  INVALID_JSON_MESSAGE,
  INVALID_USER_MESSAGE,
  NO_USER_MESSAGE,
} from '../constants/messages';
import { getIsIdValid } from '../utils/urlUtils';
import { checkRequestArguments } from '../utils/checkRequestArguments';
import { RestMethod } from '../enums/restMethod';
import { sendJsonResponse } from '../utils/sendJsonResponse';

export class UserController {
  constructor(private userService: UserService) {}

  public async getAllUsers(_req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();

    sendJsonResponse(res, users);
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const { userId, isIdValid } = getIsIdValid(req.url);

    if (isIdValid) {
      const user = await this.userService.getUserById(userId);

      if (user) {
        sendJsonResponse(res, user);
      } else {
        sendJsonResponse(res, undefined, 404, NO_USER_MESSAGE);
      }
    } else {
      sendJsonResponse(res, undefined, 400, INVALID_USER_MESSAGE);
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;

      await checkRequestArguments(
        res,
        userData,
        () => this.userService.createUser(userData),
        RestMethod.Post
      );
    } catch {
      sendJsonResponse(res, undefined, 400, INVALID_JSON_MESSAGE);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { url, body } = req;
    const { userId, isIdValid } = getIsIdValid(url);

    if (isIdValid) {
      try {
        await checkRequestArguments(
          res,
          body,
          () => this.userService.updateUser(body, userId),
          RestMethod.Post
        );
      } catch {
        sendJsonResponse(res, undefined, 400, INVALID_JSON_MESSAGE);
      }
    } else {
      sendJsonResponse(res, undefined, 400, INVALID_USER_MESSAGE);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { userId, isIdValid } = getIsIdValid(req.url);

    if (isIdValid) {
      const isUserDeleted = await this.userService.deleteUser(userId);

      if (isUserDeleted) {
        sendJsonResponse(res, undefined, 204);
      } else {
        sendJsonResponse(res, undefined, 404, NO_USER_MESSAGE);
      }
    } else {
      sendJsonResponse(res, undefined, 400, INVALID_USER_MESSAGE);
    }
  }
}
