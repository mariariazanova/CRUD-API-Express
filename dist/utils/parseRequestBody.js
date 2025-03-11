"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRequestBody = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseRequestBody = async (req) => new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
        }
        catch {
            reject(new Error('Invalid JSON'));
        }
    });
    req.on('error', (err) => {
        reject(err);
    });
});
exports.parseRequestBody = parseRequestBody;
//# sourceMappingURL=parseRequestBody.js.map