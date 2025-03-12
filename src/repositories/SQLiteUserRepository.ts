import sqlite3 from 'sqlite3';
import { User } from '../interfaces/user';
import { Repository } from '../interfaces/repository';

export class SQLiteUserRepository implements Repository {
  db: sqlite3.Database;

  constructor(dbFilePath: string) {
    console.log(dbFilePath);
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log(`Connected to the SQLite database at ${dbFilePath}`);
      }
    });
  }

  public async init(): Promise<void> {
    console.log('Initializing SQLite database...');
    this.db.run(
      'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL)'
    );
  }

  public async getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM users`, [], (err, rows: User[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as User | undefined);
        }
      });
    });
  }

  public async addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const { id, name, email } = user;

      this.db.run(
        'INSERT INTO users (id, name, email) VALUES (?, ?, ?)',
        [id, name, email],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, name, email });
          }
        }
      );
    });
  }

  public async updateUser(user: User, id: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      const { name, email } = user;

      this.db.run(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id],
        function (err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            resolve(undefined); // No user found with the provided ID
          } else {
            resolve({ id, name, email });
          }
        }
      );
    });
  }

  public async deleteUser(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
