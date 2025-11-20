import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../../api/api";
import { registerUser } from "./register-user";


vi.mock("@/api/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("registerUser service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería retornar los datos del registro", async () => {
    const mockResponse = {
      data: {
        message: "Usuario creado exitosamente",
        user: {
          id: "123",
          name: "Francisco",
          email: "fran@gmail.com",
          role: "customer",
        },
        token: "token123",
      },
    };

    (api.post as any).mockResolvedValue(mockResponse);

    const payload = {
      name: "Francisco",
      email: "fran@gmail.com",
      password: "123456",
    };

    const result = await registerUser(payload);

    expect(api.post).toHaveBeenCalledWith("/auth/register", payload);
    expect(result).toEqual(mockResponse.data);
  });

  it("debería lanzar un error si el registro falla", async () => {
    const mockError = new Error("Registro fallido");

    (api.post as any).mockRejectedValue(mockError);

    const payload = {
      name: "Francisco",
      email: "fran@gmail.com",
      password: "123456",
    };

    await expect(registerUser(payload)).rejects.toThrow("Registro fallido");
  });
});
