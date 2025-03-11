import { v4 } from 'uuid';
import { User } from '../interfaces/user';
import { Repository } from '../interfaces/repository';

export class UserService {
  constructor(private userRepository: Repository) {}

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return this.userRepository.getUserById(id);
  }

  public async createUser(
    userData: Omit<User, 'id'>
  ): Promise<User | undefined> {
    const newUser: User = { id: v4(), ...userData };

    await this.userRepository.addUser(newUser);

    return newUser;
  }

  public async updateUser(
    userData: Partial<Omit<User, 'id'>>,
    id: string
  ): Promise<User | undefined> {
    return this.userRepository.updateUser(userData, id);
  }

  public async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.deleteUser(id);
  }
}
