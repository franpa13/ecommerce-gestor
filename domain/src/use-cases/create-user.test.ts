import { describe, it, expect, vi } from "vitest";
import { CreateUser } from "../use-cases/create-user";
import { UserRepository } from "../repositories/user-repository";
import { User } from "../entities/user";


describe("CreateUser Use Case", () => {
  it("debería crear un usuario válido y guardarlo usando el repositorio", async () => {
    // Mock del repositorio
    const mockRepo: UserRepository = {
      getByEmail: vi.fn(),
      save: vi.fn().mockResolvedValue(undefined)
    };

    // Instancia del caso de uso
    const createUser = new CreateUser(mockRepo);

    // Datos de prueba
    const name = "Juan Pérez";
    const email = "juan@example.com";
    const passwordHash = "hashed123";

    // Ejecutar el caso de uso
    const user = await createUser.execute(name, email, passwordHash);

    // Verificaciones
    expect(mockRepo.save).toHaveBeenCalledTimes(1);
    expect(mockRepo.save).toHaveBeenCalledWith(expect.any(User));

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.passwordHash).toBe(passwordHash);
    expect(user.role).toBe("customer");
    expect(user.id).toBeTypeOf("string");
  });

  it("debería lanzar un error si el email es inválido", async () => {
    const mockRepo: UserRepository = {
      getByEmail: vi.fn(),
      save: vi.fn()
    };

    const createUser = new CreateUser(mockRepo);

    const invalidEmail = "juanexample.com"; // sin @
    const passwordHash = "hashed123";

    await expect(
      createUser.execute("Juan", invalidEmail, passwordHash)
    ).rejects.toThrowError("Email inválido");

    // Debe verificar que no se haya intentado guardar
    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});
