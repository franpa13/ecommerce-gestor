import { Request, Response } from 'express';
import { ListProducts } from "../../../../../domain/dist/index"


import { PostgresProductRepository } from '../repositories/postgres-product-repository';
import { GetProductById } from '../../../../../domain/src/use-cases/get-product-by-id';
import { CreateProduct } from '../../../../../domain/src/use-cases/create-product';
import { UpdateProduct } from '../../../../../domain/src/use-cases/update-product';
import { DeleteProduct } from '../../../../../domain/src/use-cases/delete-product';

export class ProductController {
  private listProducts: ListProducts;
  private getProductByIdUseCase: GetProductById;
  private createProductUseCase: CreateProduct;
  private updateProductUseCase: UpdateProduct;
  private deleteProductUseCase: DeleteProduct;

  constructor() {
    const productRepository = new PostgresProductRepository();

    this.listProducts = new ListProducts(productRepository);
    this.getProductByIdUseCase = new GetProductById(productRepository);
    this.createProductUseCase = new CreateProduct(productRepository);
    this.updateProductUseCase = new UpdateProduct(productRepository);
    this.deleteProductUseCase = new DeleteProduct(productRepository);
  }

  async ListProducts(req: Request, res: Response) {
    try {
      const products = await this.listProducts.execute();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo productos' });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await this.getProductByIdUseCase.execute(req.params.id!);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo producto' });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      await this.createProductUseCase.execute(req.body);
      res.status(201).json({ message: "Producto creado" });
    } catch (error) {
      res.status(500).json({ error: 'Error creando producto' });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      await this.updateProductUseCase.execute(req.params.id!, req.body);
      res.json({ message: "Producto actualizado" });
    } catch (error) {
      res.status(500).json({ error: 'Error actualizando producto' });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      await this.deleteProductUseCase.execute(req.params.id!);
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      res.status(500).json({ error: 'Error eliminando producto' });
    }
  }
}
