"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const express_1 = require("express");
const urls_1 = require("../constants/urls");
function userRoutes(userController) {
    const router = (0, express_1.Router)();
    router.get(urls_1.USERS_URL, (req, res) => userController.getAllUsers(req, res));
    router.get(urls_1.USERS_ID_URL, (req, res) => userController.getUserById(req, res));
    router.post(urls_1.USERS_URL, (req, res) => userController.createUser(req, res));
    router.put(urls_1.USERS_ID_URL, (req, res) => userController.updateUser(req, res));
    router.delete(urls_1.USERS_ID_URL, (req, res) => userController.deleteUser(req, res));
    return router;
}
//# sourceMappingURL=userRoutes.js.map