// scripts/init-db.ts

import fs from 'fs';
import path from 'path';
import { pool } from '../infrastructure/database/db';

async function initializeDatabase() {
  try {
    console.log('Inicializando base de datos...');
    
    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, '../database/schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Ejecutar el script
    await pool.query(sql);
    console.log('✅ Base de datos inicializada correctamente');
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();