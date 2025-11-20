import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../../api/api";
import { updateCart } from "./update-cart";
import type { UpdateResponse } from "./update-cart";


vi.mock("../../api/api", () => ({
  default: {
    put: vi.fn(),
  },
}));

describe("updateCart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe actualizar la cantidad de un producto en el carrito", async () => {
    const mockResponse: UpdateResponse = {
      message: "Cantidad actualizada",
      cart: {
        id: "cart-123",
        userId: "user-123",
        items: [
          {
            product: {
              id: "prod-1",
              name: "Tablet",
              description: "Redmi Pro",
              price: 150000,
              stock: 5,
              categoryId: "cat-123",
            },
            quantity: 12,
          },
        ],
        total: 1800000,
      },
    };


    (api.put as any).mockResolvedValue({ data: mockResponse });

    const productId = "prod-1";
    const quantity = 12;

    const result = await updateCart(productId, quantity);

    expect(api.put).toHaveBeenCalledWith(`/cart/items/${productId}`, {
      quantity,
    });

    expect(result).toEqual(mockResponse);
  });
});
