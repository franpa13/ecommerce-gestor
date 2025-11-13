import { describe, it, expect, vi } from "vitest";

import { ProductRepository } from "../repositories/product-repository";
import { Product } from "../entities/product";
import { ListProducts } from "./list-product";

describe("ListProducts Use Case", () => {
  it("debería devolver todos los productos del repositorio", async () => {
    // Datos simulados
    const mockProducts: Product[] = [
      new Product(
        "1",
        "Café Espresso",
        "Café intenso y aromático",
        1200,
        15,
        "cat-1"
      ),
      new Product(
        "2",
        "Croissant",
        "Pan de manteca francés",
        800,
        8,
        "cat-2"
      )
    ];

    // Mock del repositorio
    const mockRepo: ProductRepository = {
      getAll: vi.fn().mockResolvedValue(mockProducts),
      getById: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    };

    // Caso de uso
    const listProducts = new ListProducts(mockRepo);

    // Ejecutar
    const result = await listProducts.execute();

    // Verificaciones
    expect(mockRepo.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);

    // Validar propiedades de producto
    const [first] = result;
    expect(first).toBeInstanceOf(Product);
    expect(first?.name).toBe("Café Espresso");
    expect(first?.price).toBe(1200);
    expect(first?.stock).toBe(15);
    expect(first?.categoryId).toBe("cat-1");
  });

  it("debería devolver un array vacío si no hay productos", async () => {
    const mockRepo: ProductRepository = {
      getAll: vi.fn().mockResolvedValue([]),
      getById: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    };

    const listProducts = new ListProducts(mockRepo);
    const result = await listProducts.execute();

    expect(mockRepo.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
