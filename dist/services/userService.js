"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const uuid_1 = require("uuid");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        return this.userRepository.getUsers();
    }
    async getUserById(id) {
        return this.userRepository.getUserById(id);
    }
    async createUser(userData) {
        const newUser = { id: (0, uuid_1.v4)(), ...userData };
        await this.userRepository.addUser(newUser);
        return newUser;
    }
    async updateUser(userData, id) {
        return this.userRepository.updateUser(userData, id);
    }
    async deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map