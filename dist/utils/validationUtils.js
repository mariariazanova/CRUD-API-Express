"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUUID = void 0;
const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};
exports.isValidUUID = isValidUUID;
//# sourceMappingURL=validationUtils.js.map