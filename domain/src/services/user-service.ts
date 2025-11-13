import { User } from "../entities/user";


export class UserService {
  static validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static createUser(name: string, email: string, passwordHash: string): User {
    if (!this.validateEmail(email)) throw new Error("Email inválido");
    return new User(crypto.randomUUID(), name, email, passwordHash);
  }
}
