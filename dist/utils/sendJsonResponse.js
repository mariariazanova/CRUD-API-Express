"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJsonResponse = void 0;
const sendJsonResponse = (res, value, statusCode = 200, message = '') => {
    res.status(statusCode).json(value || { error: message });
};
exports.sendJsonResponse = sendJsonResponse;
//# sourceMappingURL=sendJsonResponse.js.map