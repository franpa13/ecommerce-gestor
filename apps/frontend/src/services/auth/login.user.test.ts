import { describe, it, expect, vi, beforeEach } from "vitest";

import api from "../../api/api";
import { loginService } from "./login-user";

vi.mock("../../api/api");

describe("loginService", () => {
  const mockResponse = {
    message: "Login exitoso",
    user: {
      id: "123",
      name: "Francisco",
      email: "frantrainer15@gmail.com",
      role: "customer",
    },
    token: "fake-token-123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería retornar los datos del login", async () => {
    // 👉 Mock de la respuesta del backend
    (api.post as any).mockResolvedValue({ data: mockResponse });

    const data = {
      email: "test@mail.com",
      password: "123456",
    };

    const result = await loginService(data);

    expect(api.post).toHaveBeenCalledWith("/auth/login", data);
    expect(result).toEqual(mockResponse);
  });

  it("debería lanzar un error si el login falla", async () => {
    (api.post as any).mockRejectedValue(new Error("Credenciales inválidas"));

    const data = {
      email: "invalid@mail.com",
      password: "wrong",
    };

    await expect(loginService(data)).rejects.toThrow("Credenciales inválidas");
  });
});
