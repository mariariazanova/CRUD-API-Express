"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllerPromise = void 0;
require("dotenv/config");
const UserRepository_1 = require("../repositories/UserRepository");
const userService_1 = require("../services/userService");
const userController_1 = require("../controllers/userController");
const isSQLiteUsed = process.env.USE_SQLITE === 'true' || false;
const SQLitePath = process.env.DB_FILE_PATH || './database.sqlite';
async function initializeUserController() {
    const userRepository = await (0, UserRepository_1.createUserRepository)(isSQLiteUsed, SQLitePath);
    const userService = new userService_1.UserService(userRepository);
    return new userController_1.UserController(userService);
}
// Export a promise that resolves when `userController` is initialized
exports.userControllerPromise = initializeUserController();
//# sourceMappingURL=config.js.map