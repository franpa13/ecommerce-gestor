// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { UserController } from '../infrastructure/controllers/user-controller';
import { CartController } from '../infrastructure/controllers/cart-controller';
import { authenticateToken } from '../middleware/auth';



// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Controllers
const userController = new UserController();
const cartController = new CartController();

// Rutas públicas
app.post('/api/auth/register', (req, res) => userController.register(req, res));
app.post('/api/auth/login', (req, res) => userController.login(req, res));

// Rutas protegidas
app.use(authenticateToken);

app.get('/api/cart', (req, res) => cartController.getCart(req, res));
app.post('/api/cart/items', (req, res) => cartController.addItem(req, res));

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Manejo de errores 404
// app.use((req, res) => {
//   res.status(404).json({ 
//     error: 'Ruta no encontrada',
//     path: req.originalUrl,
//     method: req.method
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

export default app;