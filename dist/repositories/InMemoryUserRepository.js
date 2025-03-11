"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const fs_1 = require("fs");
const node_path_1 = __importDefault(require("node:path"));
const FILE_PATH = node_path_1.default.join(process.cwd(), 'src', 'dataBase', 'data.json');
class InMemoryUserRepository {
    constructor() {
        this.users = [];
    }
    async init() {
        await this.loadDataFromFile();
    }
    getUsers() {
        return this.users;
    }
    getUserById(id) {
        return this.users.find((user) => user.id === id);
    }
    addUser(user) {
        this.users.push(user);
        this.saveDataToFile();
    }
    updateUser(userData, id) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return undefined;
        }
        const updatedUser = { ...this.users[userIndex], ...userData };
        this.users[userIndex] = updatedUser;
        this.setUsers(this.users);
        this.saveDataToFile();
        return updatedUser;
    }
    deleteUser(id) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return false;
        }
        this.users.splice(userIndex, 1);
        this.setUsers(this.users);
        this.saveDataToFile();
        return true;
    }
    setUsers(users) {
        this.users = users;
        this.saveDataToFile();
    }
    async loadDataFromFile() {
        console.log('loadDataFromFile', FILE_PATH, process.cwd());
        return new Promise((resolve, reject) => {
            const readStream = (0, fs_1.createReadStream)(FILE_PATH, { encoding: 'utf-8' });
            let data = '';
            readStream.on('data', (chunk) => {
                data += chunk;
            });
            readStream.on('end', () => {
                if (data.trim() === '') {
                    // Handle the case where the file is empty
                    this.users = [];
                }
                else {
                    try {
                        this.users = JSON.parse(data);
                    }
                    catch (error) {
                        console.error('Error parsing data:', error);
                        this.users = [];
                    }
                }
                resolve();
            });
            readStream.on('error', (error) => {
                console.error('Error reading file:', error);
                reject(error);
            });
        });
    }
    saveDataToFile() {
        const data = JSON.stringify(this.users, null, 2);
        const writeStream = (0, fs_1.createWriteStream)(FILE_PATH);
        writeStream.on('error', (error) => console.error('Error writing to file:', error));
        writeStream.write(data);
        writeStream.end();
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=InMemoryUserRepository.js.map