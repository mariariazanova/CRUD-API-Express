"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const messages_1 = require("../constants/messages");
const urlUtils_1 = require("../utils/urlUtils");
const checkRequestArguments_1 = require("../utils/checkRequestArguments");
const restMethod_1 = require("../enums/restMethod");
const sendJsonResponse_1 = require("../utils/sendJsonResponse");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers(_req, res) {
        const users = await this.userService.getAllUsers();
        (0, sendJsonResponse_1.sendJsonResponse)(res, users);
    }
    async getUserById(req, res) {
        const { userId, isIdValid } = (0, urlUtils_1.getIsIdValid)(req.url);
        if (isIdValid) {
            const user = await this.userService.getUserById(userId);
            if (user) {
                (0, sendJsonResponse_1.sendJsonResponse)(res, user);
            }
            else {
                (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 404, messages_1.NO_USER_MESSAGE);
            }
        }
        else {
            (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.INVALID_USER_MESSAGE);
        }
    }
    async createUser(req, res) {
        try {
            const userData = req.body;
            await (0, checkRequestArguments_1.checkRequestArguments)(res, userData, () => this.userService.createUser(userData), restMethod_1.RestMethod.Post);
        }
        catch {
            (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.INVALID_JSON_MESSAGE);
        }
    }
    async updateUser(req, res) {
        const { url, body } = req;
        const { userId, isIdValid } = (0, urlUtils_1.getIsIdValid)(url);
        if (isIdValid) {
            try {
                await (0, checkRequestArguments_1.checkRequestArguments)(res, body, () => this.userService.updateUser(body, userId), restMethod_1.RestMethod.Post);
            }
            catch {
                (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.INVALID_JSON_MESSAGE);
            }
        }
        else {
            (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.INVALID_USER_MESSAGE);
        }
    }
    async deleteUser(req, res) {
        const { userId, isIdValid } = (0, urlUtils_1.getIsIdValid)(req.url);
        if (isIdValid) {
            const isUserDeleted = await this.userService.deleteUser(userId);
            if (isUserDeleted) {
                (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 204);
            }
            else {
                (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 404, messages_1.NO_USER_MESSAGE);
            }
        }
        else {
            (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.INVALID_USER_MESSAGE);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map