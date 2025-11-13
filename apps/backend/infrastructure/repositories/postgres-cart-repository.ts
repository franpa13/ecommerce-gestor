import { Product, CartRepository, Cart, CartItem } from "../../../../domain/dist/index"
import { pool } from "../database/db";

export class PostgresCartRepository implements CartRepository {
  async getByUserId(userId: string): Promise<Cart> {
    const result = await pool.query(
      `SELECT c.id as cart_id, c.user_id, c.total,
              ci.product_id, ci.quantity,
              p.name, p.description, p.price, p.stock, p.category_id
       FROM carts c
       LEFT JOIN cart_items ci ON c.id = ci.cart_id
       LEFT JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0 || !result.rows[0].cart_id) {
      // Crear carrito si no existe
      const newCartId = crypto.randomUUID();
      await pool.query(
        'INSERT INTO carts (id, user_id) VALUES ($1, $2)',
        [newCartId, userId]
      );
      return new Cart(newCartId, userId, [], 0);
    }

    const items: CartItem[] = result.rows
      .filter(row => row.product_id)
      .map(row => ({
        product: new Product(
          row.product_id,
          row.name,
          row.description,
          parseFloat(row.price),
          row.stock,
          row.category_id
        ),
        quantity: row.quantity
      }));

    return new Cart(
      result.rows[0].cart_id,
      result.rows[0].user_id,
      items,
      parseFloat(result.rows[0].total || '0')
    );
  }

  async save(cart: Cart): Promise<void> {
    await pool.query('BEGIN');

    try {
      // Actualizar carrito
      await pool.query(
        'UPDATE carts SET total = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [cart.total, cart.id]
      );

      // Limpiar items existentes
      await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cart.id]);

      // Insertar nuevos items
      for (const item of cart.items) {
        await pool.query(
          'INSERT INTO cart_items (id, cart_id, product_id, quantity) VALUES ($1, $2, $3, $4)',
          [crypto.randomUUID(), cart.id, item.product.id, item.quantity]
        );
      }

      await pool.query('COMMIT');
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
  }
}