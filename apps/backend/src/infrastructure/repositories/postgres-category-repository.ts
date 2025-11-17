// src/infrastructure/repositories/postgres-category-repository.ts


import { Category } from '../../../../../domain/dist';
import { pool } from '../database/db';
import { ICategoryRepository } from '../../../../../domain/dist/src/repositories/category-repository';


export class PostgresCategoryRepository implements ICategoryRepository {
async findAll(): Promise<Category[]> {
const result = await pool.query('SELECT * FROM categories ORDER BY created_at DESC');
return result.rows.map(r => new Category(r.id, r.name, r.description));
}


async findById(id: string): Promise<Category | null> {
const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
if (result.rows.length === 0) return null;
const r = result.rows[0];
return new Category(r.id, r.name, r.description);
}


async create(category: Category): Promise<Category> {
await pool.query(
'INSERT INTO categories (id, name, description) VALUES ($1, $2, $3)',
[category.id, category.name, category.description]
);
return category;
}


async update(category: Category): Promise<Category> {
await pool.query(
'UPDATE categories SET name = $1, description = $2 WHERE id = $3',
[category.name, category.description, category.id]
);
return category;
}


async delete(id: string): Promise<void> {
await pool.query('DELETE FROM categories WHERE id = $1', [id]);
}
}