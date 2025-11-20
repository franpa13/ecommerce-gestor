import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../../api/api";
import { DeleteProductInCart, type DeleteCartProduct } from "./delete-product-in-cart";


vi.mock("../../api/api", () => ({
  default: {
    delete: vi.fn(),
  },
}));

describe("deleteCartItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe eliminar un item del carrito", async () => {
    const mockResponse: DeleteCartProduct = {
      message: "Producto eliminado del carrito",
    };

    (api.delete as any).mockResolvedValue({ data: mockResponse });

    const productId = "9e9e50ef-c23b-45f1-973a-baa851e03203";
    const result = await DeleteProductInCart(productId);

    expect(api.delete).toHaveBeenCalledWith(`/cart/items/${productId}`);
    expect(result).toEqual(mockResponse);
  });
});
