import { UserService } from "../services/user-service";
import { UserRepository } from "../repositories/user-repository";


export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(name: string, email: string, passwordHash: string) {
    const user = UserService.createUser(name, email, passwordHash);
    await this.userRepo.save(user);
    return user;
  }
}
