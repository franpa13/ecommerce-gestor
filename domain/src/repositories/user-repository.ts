import { User } from "../entities/user";


export interface UserRepository {
  getByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}