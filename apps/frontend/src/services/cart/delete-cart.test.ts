import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../../api/api";
import { deleteCart, type DeleteCartResponse } from "./delete-cart";

vi.mock("../../api/api", () => ({
    default: {
        delete: vi.fn(),
    },
}));

describe("deleteCart", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe eliminar el carrito completo", async () => {
        const mockResponse: DeleteCartResponse = {
            message: "Carrito eliminado correctamente",
        };

        (api.delete as any).mockResolvedValue({ data: mockResponse });

        const result = await deleteCart();

        expect(api.delete).toHaveBeenCalledWith("/cart");
        expect(result).toEqual(mockResponse);
    });
});
