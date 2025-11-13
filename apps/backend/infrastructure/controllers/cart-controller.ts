// src/infrastructure/controllers/cart-controller.ts
import { Request, Response } from 'express';
import {AddToCart} from "../../../../domain/dist/index"
import { PostgresCartRepository } from '../repositories/postgres-cart-repository';
import { PostgresProductRepository } from '../repositories/postgres-product-repository';

export class CartController {
  private addToCart: AddToCart;

  constructor() {
    const cartRepository = new PostgresCartRepository();
    const productRepository = new PostgresProductRepository();
    this.addToCart = new AddToCart(cartRepository, productRepository);
  }

  async addItem(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;
      const userId = (req as any).user.userId;

      if (!productId || !quantity) {
        return res.status(400).json({ error: 'productId y quantity son requeridos' });
      }

      const cart = await this.addToCart.execute(userId, productId, quantity);
      
      res.json({
        message: 'Producto agregado al carrito',
        cart
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const cartRepository = new PostgresCartRepository();
      const cart = await cartRepository.getByUserId(userId);
      
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo carrito' });
    }
  }
}