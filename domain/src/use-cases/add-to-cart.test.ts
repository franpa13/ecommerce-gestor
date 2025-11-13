import { describe, it, expect, vi, beforeEach } from "vitest";
import { CartRepository } from "../repositories/cart-repository";
import { ProductRepository } from "../repositories/product-repository";
import { AddToCart } from "./add-to-cart";
import { CartService } from "../services/cart-service";
import { Product } from "../entities/product";

describe("AddToCart Use Case", () => {
  let cartRepo: CartRepository;
  let productRepo: ProductRepository;
  let addToCart: AddToCart;

  const mockCart = { userId: "user1", items: [] };
  const mockProduct :Product =  { id: "prod1", name: "Café", price: 10 , categoryId : "2" ,description:"mock desc", stock:3 };

  beforeEach(() => {
    // Mocks de repositorios
    cartRepo = {
      getByUserId: vi.fn().mockResolvedValue(mockCart),
      save: vi.fn().mockResolvedValue(undefined),
    } as unknown as CartRepository;

    productRepo = {
      getById: vi.fn().mockResolvedValue(mockProduct),
    } as unknown as ProductRepository;

    // Mock del servicio
    vi.spyOn(CartService, "addProduct").mockReturnValue({
        userId: "user1",
        items: [{ product: mockProduct, quantity: 2 }],
        id: "",
        total: 0
    });

    addToCart = new AddToCart(cartRepo, productRepo);
  });

  it("debería agregar un producto al carrito correctamente", async () => {
    const result = await addToCart.execute("user1", "prod1", 2);

    expect(productRepo.getById).toHaveBeenCalledWith("prod1");
    expect(cartRepo.getByUserId).toHaveBeenCalledWith("user1");
    expect(CartService.addProduct).toHaveBeenCalledWith(mockCart, mockProduct, 2);
    expect(cartRepo.save).toHaveBeenCalled();
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.product.id).toBe("prod1");
  });

  it("debería lanzar un error si el producto no existe", async () => {
    vi.spyOn(productRepo, "getById").mockResolvedValueOnce(null);

    await expect(addToCart.execute("user1", "prodInexistente", 1)).rejects.toThrow(
      "Producto no encontrado"
    );
  });
});
