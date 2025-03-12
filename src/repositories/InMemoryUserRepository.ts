import { createReadStream, createWriteStream } from 'fs';
import path from 'node:path';
import { Repository } from '../interfaces/repository';
import { User } from '../interfaces/user';

const FILE_PATH = path.join(process.cwd(), 'src', 'dataBase', 'data.json');

export class InMemoryUserRepository implements Repository {
  users: User[] = [];

  public async init(): Promise<void> {
    await this.loadDataFromFile();
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public addUser(user: User): void {
    this.users.push(user);
    this.saveDataToFile();
  }

  public updateUser(
    userData: Partial<Omit<User, 'id'>>,
    id: string
  ): User | undefined {
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

  public deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    this.setUsers(this.users);
    this.saveDataToFile();

    return true;
  }

  private setUsers(users: User[]): void {
    this.users = users;
    this.saveDataToFile();
  }

  private async loadDataFromFile(): Promise<void> {
    console.log('loadDataFromFile', FILE_PATH, process.cwd());
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(FILE_PATH, { encoding: 'utf-8' });
      let data = '';

      readStream.on('data', (chunk) => {
        data += chunk;
      });

      readStream.on('end', () => {
        if (data.trim() === '') {
          // Handle the case where the file is empty
          this.users = [];
        } else {
          try {
            this.users = JSON.parse(data);
          } catch (error) {
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

  private saveDataToFile(): void {
    const data = JSON.stringify(this.users, null, 2);
    const writeStream = createWriteStream(FILE_PATH);

    writeStream.on('error', (error) =>
      console.error('Error writing to file:', error)
    );

    writeStream.write(data);
    writeStream.end();
  }
}
