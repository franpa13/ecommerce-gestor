import { describe, it, expect, vi } from "vitest";
import { LoginUser } from "../use-cases/login-user";
import { UserRepository } from "../repositories/user-repository";
import { User } from "../entities/user";

describe("LoginUser Use Case", () => {
  it("debería iniciar sesión correctamente con credenciales válidas", async () => {
    // Datos simulados
    const mockUser = new User(
      "1",
      "Juan Pérez",
      "juan@example.com",
      "hashed123"
    );

    // Mock del repositorio
    const mockRepo: UserRepository = {
      getByEmail: vi.fn().mockResolvedValue(mockUser),
      save: vi.fn()
    };

    // Caso de uso
    const loginUser = new LoginUser(mockRepo);

    // Ejecutar
    const result = await loginUser.execute("juan@example.com", "hashed123");

    // Verificaciones
    expect(mockRepo.getByEmail).toHaveBeenCalledTimes(1);
    expect(mockRepo.getByEmail).toHaveBeenCalledWith("juan@example.com");
    expect(result).toBe(mockUser);
    expect(result.email).toBe("juan@example.com");
  });

  it("debería lanzar un error si el usuario no existe", async () => {
    const mockRepo: UserRepository = {
      getByEmail: vi.fn().mockResolvedValue(null),
      save: vi.fn()
    };

    const loginUser = new LoginUser(mockRepo);

    await expect(
      loginUser.execute("noexiste@example.com", "hashed123")
    ).rejects.toThrowError("Usuario no encontrado");

    expect(mockRepo.getByEmail).toHaveBeenCalledTimes(1);
  });

  it("debería lanzar un error si la contraseña es incorrecta", async () => {
    const mockUser = new User(
      "1",
      "Juan Pérez",
      "juan@example.com",
      "hashed123"
    );

    const mockRepo: UserRepository = {
      getByEmail: vi.fn().mockResolvedValue(mockUser),
      save: vi.fn()
    };

    const loginUser = new LoginUser(mockRepo);

    await expect(
      loginUser.execute("juan@example.com", "wrongpass")
    ).rejects.toThrowError("Contraseña incorrecta");

    expect(mockRepo.getByEmail).toHaveBeenCalledTimes(1);
  });
});
