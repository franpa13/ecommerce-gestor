import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar las rutas - CORREGIDO
import authRoutes from './routes/auth-routes';
import cartRoutes from './routes/cart-routes';
import productRoutes from './routes/product-routes';
import {  swaggerSpec, swaggerUi } from './swagger/swagger-config';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Registrar las rutas
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', productRoutes);

// Ruta de salud
app.get('/api/health', (_, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// RUTA DE SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;