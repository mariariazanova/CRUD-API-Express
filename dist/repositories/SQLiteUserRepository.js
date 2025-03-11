"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLiteUserRepository = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
class SQLiteUserRepository {
    constructor(dbFilePath) {
        console.log(dbFilePath);
        this.db = new sqlite3_1.default.Database(dbFilePath, (err) => {
            if (err) {
                console.error('Database connection error:', err);
            }
            else {
                console.log(`Connected to the SQLite database at ${dbFilePath}`);
            }
        });
    }
    async init() {
        console.log('Initializing SQLite database...');
        this.db.run('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL)');
    }
    async getUsers() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM users`, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    async getUserById(id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    async addUser(user) {
        return new Promise((resolve, reject) => {
            const { id, name, email } = user;
            this.db.run('INSERT INTO users (id, name, email) VALUES (?, ?, ?)', [id, name, email], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ id, name, email });
                }
            });
        });
    }
    async updateUser(user, id) {
        return new Promise((resolve, reject) => {
            const { name, email } = user;
            this.db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function (err) {
                if (err) {
                    reject(err);
                }
                else if (this.changes === 0) {
                    resolve(undefined); // No user found with the provided ID
                }
                else {
                    resolve({ id, name, email });
                }
            });
        });
    }
    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
                if (err) {
                    reject(err);
                }
                else if (this.changes === 0) {
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.SQLiteUserRepository = SQLiteUserRepository;
//# sourceMappingURL=SQLiteUserRepository.js.map