"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const sendJsonResponse_1 = require("../utils/sendJsonResponse");
const messages_1 = require("../constants/messages");
const errorHandler = (err, _req, res) => {
    console.error(err);
    (0, sendJsonResponse_1.sendJsonResponse)(res, undefined, 500, messages_1.INTERNAL_ERROR_MESSAGE);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map