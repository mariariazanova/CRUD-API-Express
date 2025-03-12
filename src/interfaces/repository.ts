import { User } from './user';

export interface Repository {
  init(): Promise<void>;
  getUsers(): User[] | Promise<User[]>;
  getUserById(id: string): User | Promise<User | undefined> | undefined;
  addUser(user: User): void;
  updateUser(
    user: Partial<Omit<User, 'id'>>,
    id: string
  ): User | Promise<User | undefined> | undefined;
  deleteUser(id: string): boolean | Promise<boolean>;
}
