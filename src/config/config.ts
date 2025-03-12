import 'dotenv/config';
import { createUserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/userService';
import { UserController } from '../controllers/userController';

const isSQLiteUsed = process.env.USE_SQLITE === 'true' || false;
const SQLitePath = process.env.DB_FILE_PATH || './database.sqlite';

async function initializeUserController(): Promise<UserController> {
  const userRepository = await createUserRepository(isSQLiteUsed, SQLitePath);
  const userService = new UserService(userRepository);

  return new UserController(userService);
}

// Export a promise that resolves when `userController` is initialized
export const userControllerPromise = initializeUserController();
