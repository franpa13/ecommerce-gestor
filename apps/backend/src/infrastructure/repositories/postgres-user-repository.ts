// src/infrastructure/repositories/postgres-user-repository.ts
import { UserRepository  ,User} from "../../../../../domain/dist/index"
import { pool } from "../database/db";

export class PostgresUserRepository implements UserRepository {
  async getByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return new User(
      row.id,
      row.name,
      row.email,
      row.password_hash,
      row.role
    );
  }

  async save(user: User): Promise<void> {
    await pool.query(
      `INSERT INTO users (id, name, email, password_hash, role) 
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, user.name, user.email, user.passwordHash, user.role]
    );
  }

  async getById(id: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return new User(
      row.id,
      row.name,
      row.email,
      row.password_hash,
      row.role
    );
  }
}