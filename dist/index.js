"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("./server");
const messages_1 = require("./constants/messages");
const PORT = process.env.PORT || 4000;
async function bootstrap() {
    try {
        await (0, server_1.startServer)(PORT);
    }
    catch (error) {
        console.error(messages_1.SERVER_ERROR_START_MESSAGE);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map