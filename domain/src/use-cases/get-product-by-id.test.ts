import { describe, it, expect } from "vitest";
import { GetProductById } from "../use-cases/get-product-by-id";
import { Product } from "../entities/product";
import { ProductRepositoryMock } from "../../mock/product-repository-mock";


describe("GetProductById Use Case", () => {
  it("should return a product by id", async () => {
    const repo = new ProductRepositoryMock();
    repo.products.push(new Product("123", "Prod1", "Desc", 10, 5, "cat1"));

    const useCase = new GetProductById(repo);
    const result = await useCase.execute("123");

    expect(result?.id).toBe("123");
  });

  it("should return null if product does not exist", async () => {
    const repo = new ProductRepositoryMock();
    const useCase = new GetProductById(repo);

    const result = await useCase.execute("no-exists");
    expect(result).toBeNull();
  });
});
