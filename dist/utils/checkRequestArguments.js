"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRequestArguments = void 0;
const sendJsonResponse_1 = require("./sendJsonResponse");
const restMethod_1 = require("../enums/restMethod");
const messages_1 = require("../constants/messages");
const requiredKeys = ['name', 'email'];
const checkRequestArguments = async (
/* eslint-disable @typescript-eslint/no-explicit-any */
res, body, fn, 
/* eslint-enable @typescript-eslint/no-explicit-any */
method, userId) => {
    if (Object.keys(body).every((key) => requiredKeys.includes(key))) {
        if (requiredKeys.some((key) => !body[key])) {
            (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.EMPTY_REQUIRED_FIELD_MESSAGE);
        }
        else if (requiredKeys.some((key) => typeof body[key] !== 'string')) {
            (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.INCORRECT_DATA_FORMAT_MESSAGE);
        }
        else {
            try {
                const user = await fn(userId, body);
                if (method === restMethod_1.RestMethod.Post) {
                    (0, sendJsonResponse_1.sendJsonResponse)(res, user, 201);
                }
                else {
                    if (user) {
                        (0, sendJsonResponse_1.sendJsonResponse)(res, user);
                    }
                    else {
                        (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 404, messages_1.NO_USER_MESSAGE);
                    }
                }
            }
            catch {
                (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 500, messages_1.INTERNAL_ERROR_MESSAGE);
            }
        }
    }
    else {
        if (Object.keys(body).some((key) => key === 'id')) {
            (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.IMPOSSIBLE_UPDATE_ID_MESSAGE);
        }
        else {
            (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 400, messages_1.INCORRECT_FIELD_MESSAGE);
        }
    }
};
exports.checkRequestArguments = checkRequestArguments;
//# sourceMappingURL=checkRequestArguments.js.map