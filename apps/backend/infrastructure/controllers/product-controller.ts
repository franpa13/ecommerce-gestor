// src/infrastructure/controllers/product-controller.ts
import { Request, Response } from 'express';
import {ListProducts} from "../../../../domain/dist/index"
import { PostgresProductRepository } from '../repositories/postgres-product-repository';

export class ProductController {
  private listProducts: ListProducts;

  constructor() {
    const productRepository = new PostgresProductRepository();
    this.listProducts = new ListProducts(productRepository);
  }

  async ListProducts(req: Request, res: Response) {
    try {
      const products = await this.listProducts.execute();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo productos' });
    }
  }
}