import { UserRepository } from "../repositories/user-repository";


export class LoginUser {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string, passwordHash: string) {
    const user = await this.userRepo.getByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");
    if (user.passwordHash !== passwordHash) throw new Error("Contraseña incorrecta");
    return user;
  }
}
