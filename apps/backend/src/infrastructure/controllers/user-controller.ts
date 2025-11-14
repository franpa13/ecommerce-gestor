
import { Request, Response } from 'express';
import {  CreateUser, LoginUser } from "../../../../../domain/dist/index"
import { PostgresUserRepository } from '../repositories/postgres-user-repository';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';




export class UserController {
  private createUser: CreateUser;
  private loginUser: LoginUser;

  constructor() {
    const userRepository = new PostgresUserRepository();
    this.createUser = new CreateUser(userRepository);
    this.loginUser = new LoginUser(userRepository);
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      
      const user = await this.createUser.execute(name, email, passwordHash);
      
      // Generar JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );
      
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      const userRepository = new PostgresUserRepository();
      const user = await userRepository.getByEmail(email);
      
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}