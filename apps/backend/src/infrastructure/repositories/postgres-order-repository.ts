// src/infrastructure/repositories/postgres-order-repository.ts
import { ProductRepository , Product, OrderRepository, Order} from "../../../../../domain/dist/index"
import { pool } from "../database/db";

export class PostgresOrderRepository implements OrderRepository {
  async getByUserId(userId: string): Promise<Order[]> {
    const result = await pool.query(
      `SELECT o.*, 
              oi.product_id, oi.quantity, oi.price,
              p.name, p.description, p.stock, p.category_id
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    const ordersMap = new Map<string, Order>();
    
    result.rows.forEach(row => {
      if (!ordersMap.has(row.id)) {
        ordersMap.set(row.id, new Order(
          row.id,
          row.user_id,
          [],
          parseFloat(row.total),
          row.status,
          new Date(row.created_at)
        ));
      }

      if (row.product_id) {
        const order = ordersMap.get(row.id)!;
        const product = new Product(
          row.product_id,
          row.name,
          row.description,
          parseFloat(row.price),
          row.stock,
          row.category_id
        );
        
        order.items.push({
          product,
          quantity: row.quantity
        });
      }
    });

    return Array.from(ordersMap.values());
  }

  async save(order: Order): Promise<void> {
    await pool.query('BEGIN');

    try {
      // Insertar orden
      await pool.query(
        `INSERT INTO orders (id, user_id, total, status, created_at) 
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, order.userId, order.total, order.status, order.createdAt]
      );

      // Insertar items de la orden
      for (const item of order.items) {
        await pool.query(
          `INSERT INTO order_items (id, order_id, product_id, quantity, price) 
           VALUES ($1, $2, $3, $4, $5)`,
          [crypto.randomUUID(), order.id, item.product.id, item.quantity, item.product.price]
        );
      }

      await pool.query('COMMIT');
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
  }

  async updateStatus(orderId: string, status: string): Promise<void> {
    await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2',
      [status, orderId]
    );
  }
}