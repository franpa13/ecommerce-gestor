import { describe, it, expect, vi } from "vitest";
import api from "../../api/api";
import { createCart } from "./create-cart";
import type { CreateCartResponse } from "../../interfaces/cart-types";


vi.mock("../../api/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("createCart", () => {
  it("debería retornar los datos del carrito al agregar un producto", async () => {
    const mockResponse: CreateCartResponse = {
      message: "Producto agregado al carrito",
      cart: {
        id: "db593861-4648-463c-8b22-9cce66ef088e",
        userId: "8bf1bd0b-6c05-401b-bcd4-80ab2bae2528",
        items: [
          {
            product: {
              id: "9e9e50ef-c23b-45f1-973a-baa851e03203",
              name: "Tablet",
              description: "Redmi pro",
              price: 150000,
              stock: 5,
              categoryId: "04e6d764-7e63-48f0-94b6-4fdd125e68e1",
            },
            quantity: 2,
          },
        ],
        total: 300000,
      },
    };

    // mock del postt
    (api.post as any).mockResolvedValue({ data: mockResponse });

    const result = await createCart();

    expect(api.post).toHaveBeenCalledWith("/cart/items");
    expect(result).toEqual(mockResponse);
  });

  it("debería lanzar un error si la petición falla", async () => {
    (api.post as any).mockRejectedValue(new Error("Error al crear el carrito"));

    await expect(createCart()).rejects.toThrow("Error al crear el carrito");
  });
});
