// scripts/find-password.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function findPassword() {
  console.log('🔑 Probando contraseñas para PostgreSQL...\n');

  const passwords = [
    'admin123',      // De tu otro proyecto
    'postgres',      // Común por defecto
    '123456',        // Muy común
    'password',      // Muy común
    'admin',         // Común
      'admin123', 
    'root',          // Común
    '1234',          // Simple
    '',              // Sin contraseña (poco probable)
  ];

  for (const password of passwords) {
    const pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: password,
      connectionTimeoutMillis: 2000,
    });

    try {
      const client = await pool.connect();
      console.log(`✅ ¡CONTRASEÑA CORRECTA: "${password}"`);
      
      const version = await client.query('SELECT version()');
      console.log(`   📋 ${version.rows[0].version.split(',')[0]}`);
      
      client.release();
      await pool.end();
      
      console.log(`\n💡 Usa esta configuración en tu .env:`);
      console.log(`DB_PASSWORD=${password}`);
      return;
      
    } catch (error: any) {
      console.log(`❌ Contraseña: "${password}" - Incorrecta`);
    } finally {
      await pool.end();
    }
  }

  console.log('\n🔐 No se pudo encontrar la contraseña automáticamente');
  console.log('💡 Soluciones:');
  console.log('   1. Recuerda qué contraseña usaste al instalar PostgreSQL');
  console.log('   2. Reinstala PostgreSQL con una contraseña que recuerdes');
  console.log('   3. O restablece la contraseña (más complejo)');
}

findPassword();