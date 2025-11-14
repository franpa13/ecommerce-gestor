import { describe, it, expect } from "vitest";
import { UpdateProduct } from "../use-cases/update-product";
import { Product } from "../entities/product";
import { ProductRepositoryMock } from "../../mock/product-repository-mock";


describe("UpdateProduct Use Case", () => {
  it("should update an existing product", async () => {
    const repo = new ProductRepositoryMock();
    repo.products.push(new Product("1", "Old", "Desc", 10, 5, "cat1"));

    const useCase = new UpdateProduct(repo);

    await useCase.execute("1", {
      name: "Updated",
      description: "New desc",
      price: 50,
      stock: 10,
      categoryId: "cat1"
    });

    const updated = repo.products.find(p => p.id === "1")!;

    expect(updated.name).toBe("Updated");
    expect(updated.price).toBe(50);
  });

  it("should throw error if product does not exist", async () => {
    const repo = new ProductRepositoryMock();
    const useCase = new UpdateProduct(repo);

    await expect(useCase.execute("999", {
      name: "X",
      description: "X",
      price: 1,
      stock: 1,
      categoryId: "cat1"
    })).rejects.toThrowError("Producto no encontrado");
  });
});
