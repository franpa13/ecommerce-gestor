import { describe, it, expect } from "vitest";
import { DeleteProduct } from "../use-cases/delete-product";
import { Product } from "../entities/product";
import { ProductRepositoryMock } from "../../mock/product-repository-mock";

describe("DeleteProduct Use Case", () => {
  it("should delete a product", async () => {
    const repo = new ProductRepositoryMock();
    repo.products.push(new Product("1", "Prod", "Desc", 10, 5, "cat1"));

    const useCase = new DeleteProduct(repo);

    await useCase.execute("1");

    expect(repo.products.length).toBe(0);
  });

  it("should throw error if product does not exist", async () => {
    const repo = new ProductRepositoryMock();
    const useCase = new DeleteProduct(repo);

    await expect(useCase.execute("not-found"))
      .rejects
      .toThrowError("Producto no encontrado");
  });
});
