"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsIdValid = void 0;
const url_1 = require("url");
const validationUtils_1 = require("./validationUtils");
const parseUrl = (url) => {
    const parsedUrl = (0, url_1.parse)(url, true);
    const pathname = parsedUrl.pathname || '/';
    const { query } = parsedUrl;
    return { pathname, query };
};
const getIdFromUrl = (url) => {
    const pathSegments = url.split('/');
    return pathSegments[pathSegments.length - 1];
};
const getIsIdValid = (reqUrl) => {
    const { pathname } = parseUrl(reqUrl || '');
    const userId = getIdFromUrl(pathname);
    return { userId, isIdValid: (0, validationUtils_1.isValidUUID)(userId) };
};
exports.getIsIdValid = getIsIdValid;
//# sourceMappingURL=urlUtils.js.map