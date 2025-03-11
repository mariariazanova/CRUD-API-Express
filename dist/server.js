"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importStar(require("express"));
// import { saveDataToFile, setUsers } from './dataBase/dataBaseState';
const messages_1 = require("./constants/messages");
const config_1 = require("./config/config");
const userRoutes_1 = require("./routes/userRoutes");
const errorHandler_1 = require("./middlewares/errorHandler");
async function startServer(port) {
    const app = (0, express_1.default)();
    app.use((0, express_1.json)());
    const userController = await config_1.userControllerPromise;
    app.use('/api', (0, userRoutes_1.userRoutes)(userController));
    // Global error handler
    app.use(errorHandler_1.errorHandler);
    // Start the server
    const server = app.listen(port, () => {
        console.log(`${messages_1.SERVER_RUNNING_MESSAGE} ${port}`);
    });
    // Handle errors
    server.on('error', () => {
        console.log(messages_1.SERVER_ERROR_CLOSE_MESSAGE);
        // setUsers([]);
        // saveDataToFile();
        process.exit(1);
    });
    // Graceful shutdown (CTRL+C)
    process.on('SIGINT', () => {
        // setUsers([]);
        // saveDataToFile();
        server.close((err) => {
            if (err) {
                console.error(messages_1.SERVER_ERROR_CLOSE_MESSAGE);
                process.exit(1);
            }
            else {
                console.log(messages_1.SERVER_CLOSE_MESSAGE);
                process.exit(0);
            }
        });
    });
}
//# sourceMappingURL=server.js.map