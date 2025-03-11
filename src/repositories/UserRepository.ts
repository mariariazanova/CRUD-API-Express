import { InMemoryUserRepository } from './InMemoryUserRepository';
import { SQLiteUserRepository } from './SQLiteUserRepository';
import { Repository } from '../interfaces/repository';

export async function createUserRepository(
  isSQLiteUsed: boolean,
  SQLitePath: string
): Promise<Repository> {
  let repository: Repository;

  if (isSQLiteUsed) {
    repository = new SQLiteUserRepository(SQLitePath);
  } else {
    repository = new InMemoryUserRepository();
  }

  await repository.init();

  return repository;
}
