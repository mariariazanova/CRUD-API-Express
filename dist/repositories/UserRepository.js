"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRepository = createUserRepository;
const InMemoryUserRepository_1 = require("./InMemoryUserRepository");
const SQLiteUserRepository_1 = require("./SQLiteUserRepository");
async function createUserRepository(isSQLiteUsed, SQLitePath) {
    let repository;
    if (isSQLiteUsed) {
        repository = new SQLiteUserRepository_1.SQLiteUserRepository(SQLitePath);
    }
    else {
        repository = new InMemoryUserRepository_1.InMemoryUserRepository();
    }
    await repository.init();
    return repository;
}
//# sourceMappingURL=UserRepository.js.map