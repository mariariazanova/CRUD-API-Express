import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { USERS_ID_URL, USERS_URL } from '../constants/urls';

export function userRoutes(userController: UserController): Router {
  const router = Router();

  router.get(USERS_URL, (req, res) => userController.getAllUsers(req, res));
  router.get(USERS_ID_URL, (req, res) => userController.getUserById(req, res));
  router.post(USERS_URL, (req, res) => userController.createUser(req, res));
  router.put(USERS_ID_URL, (req, res) => userController.updateUser(req, res));
  router.delete(USERS_ID_URL, (req, res) =>
    userController.deleteUser(req, res)
  );

  return router;
}
