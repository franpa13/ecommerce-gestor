import { describe, it, expect } from "vitest";
import { CreateProduct } from "../use-cases/create-product";
import { ProductRepositoryMock } from '../../mock/product-repository-mock';


describe("CreateProduct Use Case", () => {
    it("should create a new product", async () => {
        const repo = new ProductRepositoryMock();
        const useCase = new CreateProduct(repo);

        await useCase.execute({
            name: "New Product",
            description: "A product",
            price: 100,
            stock: 20,
            categoryId: "cat1",
            imgUrl:"img"
        });

        expect(repo.products.length).toBe(1);
        expect(repo.products[0]?.name).toBe("New Product");
    });
});
