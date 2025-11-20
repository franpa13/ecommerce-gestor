import { describe, it, expect, vi } from "vitest";
import api from "../../api/api";
import type { GetCartResponse } from "../../interfaces/cart-types";
import { getCart } from "./get-cart";


vi.mock("../../api/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getCart service", () => {
  it("debe retornar la data del cart", async () => {
    const mockResponse: GetCartResponse = {
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
    };

    (api.get as any).mockResolvedValue({ data: mockResponse });

    const result = await getCart();

    expect(api.get).toHaveBeenCalledWith("/cart");
    expect(result).toEqual(mockResponse);
  });
});
