// src/infrastructure/controllers/category-controller.ts
import { Request, Response } from 'express';

import { PostgresCategoryRepository } from '../repositories/postgres-category-repository';
import { CategoryService } from '../../../../../domain/src/services/category-service';
import { CreateCategoryUseCase } from '../../../../../domain/src/use-cases/create-category';
import { UpdateCategoryUseCase } from '../../../../../domain/src/use-cases/update-category';
import { DeleteCategoryUseCase } from '../../../../../domain/src/use-cases/delete-category';
import { GetCategoryUseCase } from '../../../../../domain/src/use-cases/get-category';
import { GetAllCategoriesUseCase } from '../../../../../domain/src/use-cases/get-all-category';


export class CategoryController {
private createCategory: CreateCategoryUseCase;
private updateCategory: UpdateCategoryUseCase;
private deleteCategory: DeleteCategoryUseCase;
private getCategory: GetCategoryUseCase;
private getAllCategories: GetAllCategoriesUseCase;


constructor() {
const repository = new PostgresCategoryRepository();
const service = new CategoryService(repository);


this.createCategory = new CreateCategoryUseCase(service);
this.updateCategory = new UpdateCategoryUseCase(service);
this.deleteCategory = new DeleteCategoryUseCase(service);
this.getCategory = new GetCategoryUseCase(service);
this.getAllCategories = new GetAllCategoriesUseCase(service);
}


async list(req: Request, res: Response) {
try {
const result = await this.getAllCategories.execute();
res.json(result);
} catch {
res.status(500).json({ error: 'Error obteniendo categorías' });
}
}


async get(req: Request, res: Response) {
try {
const category = await this.getCategory.execute(req.params.id!);
if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
res.json(category);
} catch {
res.status(500).json({ error: 'Error obteniendo categoría' });
}
}


async create(req: Request, res: Response) {
try {
await this.createCategory.execute(req.body);
res.status(201).json({ message: 'Categoría creada' });
} catch {
res.status(500).json({ error: 'Error creando categoría' });
}
}


async update(req: Request, res: Response) {
try {
await this.updateCategory.execute({ id: req.params.id, ...req.body });
res.json({ message: 'Categoría actualizada' });
} catch {
res.status(500).json({ error: 'Error actualizando categoría' });
}
}


async delete(req: Request, res: Response) {
try {
await this.deleteCategory.execute(req.params.id!);
res.json({ message: 'Categoría eliminada' });
} catch {
res.status(500).json({ error: 'Error eliminando categoría' });
}
}
}