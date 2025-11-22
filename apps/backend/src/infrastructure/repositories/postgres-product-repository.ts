import { Product } from "../../../../../domain/dist/src/entities";
import { ProductRepository } from "../../../../../domain/src/repositories";
import { pool } from "../database/db";

export class PostgresProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const result = await pool.query(`
      SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.price, 
        p.stock, 
        p.img_url as "imgUrl", 
        p.category_id as "categoryId",
        c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);

    return result.rows.map(row => new Product(
      row.id,
      row.name,
      row.description,
      parseFloat(row.price),
      row.stock,
      row.imgUrl,
      row.categoryId
    ));
  }

  async getById(id: string): Promise<Product | null> {
    const result = await pool.query(
      `SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.price, 
        p.stock, 
        p.img_url as "imgUrl",
        p.category_id as "categoryId",
        c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Product(
      row.id,
      row.name,
      row.description,
      parseFloat(row.price),
      row.stock,
      row.imgUrl,
      row.categoryId
    );
  }

  async save(product: Product): Promise<void> {
    console.log(product, "proid");

    await pool.query(
      `INSERT INTO products (id, name, description, price, stock, img_url, category_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        product.id,
        product.name,
        product.description,
        product.price,
        product.stock,
        product.imgUrl,
        product.categoryId
      ]
    );


  }

  async update(product: Product): Promise<void> {
    await pool.query(
      `UPDATE products 
       SET name = $1, description = $2, price = $3, stock = $4, img_url = $5, category_id = $6
       WHERE id = $7`,
      [
        product.name,
        product.description,
        product.price,
        product.stock,
        product.imgUrl,
        product.categoryId,
        product.id
      ]
    );
  }
}
// // src/infrastructure/repositories/postgres-product-repository.ts
// import { ProductRepository } from "../../../../../domain/dist/index"
// import { pool } from "../database/db";
// import { Product } from "../../../../../domain/dist/src/entities";


// export class PostgresProductRepository implements ProductRepository {
//   async getAll(): Promise<Product[]> {
//     const result = await pool.query(`
//       SELECT p.*, c.name as category_name
//       FROM products p
//       LEFT JOIN categories c ON p.category_id = c.id
//       ORDER BY p.created_at DESC
//     `);

//     return result.rows.map(row => new Product(
//       row.id,
//       row.name,
//       row.description,
//       parseFloat(row.price),
//       row.stock,
//       row.img_url,
//       row.category_id
//     ));

//   }

//   async getById(id: string): Promise<Product | null> {
//     const result = await pool.query(
//       `SELECT p.*, c.name as category_name
//        FROM products p
//        LEFT JOIN categories c ON p.category_id = c.id
//        WHERE p.id = $1`,
//       [id]
//     );

//     if (result.rows.length === 0) return null;

//     const row = result.rows[0];
//     return new Product(
//       row.id,
//       row.name,
//       row.description,
//       parseFloat(row.price),
//       row.stock,
//       row.img_url,
//       row.category_id
//     );
//   }

//   async save(product: Product): Promise<void> {
//     await pool.query(
//       `INSERT INTO products (id, name, description, price, stock, img_url, category_id)
//        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
//       [
//         product.id,
//         product.name,
//         product.description,
//         product.price,
//         product.stock,
//         product.imgUrl,
//         product.categoryId
//       ]
//     );
//   }

//   async update(product: Product): Promise<void> {
//     await pool.query(
//       `UPDATE products
//        SET name = $1, description = $2, price = $3, stock = $4, img_url = $5, category_id = $6
//        WHERE id = $7`,
//       [
//         product.name,
//         product.description,
//         product.price,
//         product.stock,
//         product.imgUrl || null,
//         product.categoryId,
//         product.id
//       ]
//     );
//   }

//   async delete(id: string): Promise<void> {
//     await pool.query('DELETE FROM products WHERE id = $1', [id]);
//   }
// }