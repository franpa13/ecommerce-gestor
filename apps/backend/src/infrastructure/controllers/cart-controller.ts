import { Request, Response } from 'express';
import { AddToCart } from "../../../../../domain/dist/index";
import { PostgresCartRepository } from '../repositories/postgres-cart-repository';
import { PostgresProductRepository } from '../repositories/postgres-product-repository';

export class CartController {
  private addToCart: AddToCart;
  private cartRepository: PostgresCartRepository;

  constructor() {
    const cartRepository = new PostgresCartRepository();
    const productRepository = new PostgresProductRepository();
    this.addToCart = new AddToCart(cartRepository, productRepository);
    this.cartRepository = cartRepository;
  }

  async addItem(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;
      const userId = (req as any).user.userId;

      if (!productId || !quantity) {
        return res.status(400).json({ error: 'productId y quantity son requeridos' });
      }

      const cart = await this.addToCart.execute(userId, productId, quantity);
      res.json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const cart = await this.cartRepository.getByUserId(userId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo carrito' });
    }
  }

  async updateItem(req: Request, res: Response) {
          console.log(req, "userid");
    try {
      const userId = (req as any).user.userId;

      
      const { productId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
      }

      const updatedCart = await this.cartRepository.updateItemQuantity(userId, productId!, quantity);
      res.json({ message: 'Cantidad actualizada', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ error: 'Error actualizando cantidad' });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { productId } = req.params;

      await this.cartRepository.removeItem(userId, productId!);
      res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
      res.status(500).json({ error: 'Error eliminando producto del carrito' });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      await this.cartRepository.clear(userId);
      res.json({ message: 'Carrito vaciado' });
    } catch (error) {
      res.status(500).json({ error: 'Error vaciando carrito' });
    }
  }
}
