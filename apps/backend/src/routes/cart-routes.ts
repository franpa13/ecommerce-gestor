import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { CartController } from '../infrastructure/controllers/cart-controller';

const router = Router();
const cartController = new CartController();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operaciones del carrito de compras
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtener el carrito del usuario autenticado
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *       401:
 *         description: No autorizado
 */
router.get('/cart', authenticateToken, (req, res) => cartController.getCart(req, res));

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto agregado al carrito
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/cart/items', authenticateToken, (req, res) => cartController.addItem(req, res));

/**
 * @swagger
 * /cart/items/{productId}:
 *   put:
 *     summary: Actualizar cantidad de un producto en el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado en el carrito
 *       401:
 *         description: No autorizado
 */
router.put('/cart/items/{productId}', authenticateToken, (req, res) => cartController.updateItem(req, res));

/**
 * @swagger
 * /cart/items/{productId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/cart/items/{productId}', authenticateToken, (req, res) => cartController.removeItem(req, res));

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Vaciar todo el carrito del usuario
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito eliminado completamente
 *       401:
 *         description: No autorizado
 */
router.delete('/cart', authenticateToken, (req, res) => cartController.clearCart(req, res));

export default router;
