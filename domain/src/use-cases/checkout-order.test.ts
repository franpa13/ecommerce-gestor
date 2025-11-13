import { describe, it, expect, vi, beforeEach } from "vitest";
import { CheckoutOrder } from "../../src/use-cases/checkout-order";
import { CartRepository } from "../../src/repositories/cart-repository";
import { OrderRepository } from "../../src/repositories/order-repository";
import { OrderService } from "../../src/services/order-service";
import { Order } from "../../src/entities/order";
import { CartItem } from "../../src/entities/cart";

describe("CheckoutOrder Use Case", () => {
  let cartRepo: CartRepository;
  let orderRepo: OrderRepository;
  let checkoutOrder: CheckoutOrder;

  const mockCart = {
    userId: "user1",
    items: [{ productId: "prod1", quantity: 2, price: 50 }] as unknown as CartItem[],
  };

  const mockOrder = new Order(
    "order1",
    "user1",
    mockCart.items,
    100,
    "pending",
    new Date("2025-11-12T00:00:00Z")
  );

  beforeEach(() => {
    cartRepo = {
      getByUserId: vi.fn().mockResolvedValue(mockCart),
    } as unknown as CartRepository;

    orderRepo = {
      save: vi.fn().mockResolvedValue(undefined),
    } as unknown as OrderRepository;

    vi.spyOn(OrderService, "createOrderFromCart").mockReturnValue(mockOrder);

    checkoutOrder = new CheckoutOrder(cartRepo, orderRepo);
  });

  it("debería crear una orden correctamente a partir del carrito", async () => {
    const result = await checkoutOrder.execute("user1");

    expect(cartRepo.getByUserId).toHaveBeenCalledWith("user1");
    expect(OrderService.createOrderFromCart).toHaveBeenCalledWith("user1", mockCart);
    expect(orderRepo.save).toHaveBeenCalledWith(mockOrder);

    // Verifica que sea una instancia de Order
    expect(result).toBeInstanceOf(Order);

    // Verifica sus propiedades
    expect(result.userId).toBe("user1");
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(100);
    expect(result.status).toBe("pending");
  });

  it("debería lanzar un error si el carrito no existe", async () => {
    vi.spyOn(cartRepo, "getByUserId").mockResolvedValueOnce(null as unknown as any);

    await expect(checkoutOrder.execute("user1")).rejects.toThrow(
      "No se encontró el carrito del usuario"
    );
  });
});
