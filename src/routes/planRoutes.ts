import { Router } from "express";
import planController from "../controllers/planController";

const planRouter = Router();

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Retorna todos os planos
 *     tags:
 *       - Plans
 *     responses:
 *       200:
 *         description: Lista de planos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   valor:
 *                     type: number
 *                   duracaoEmMes:
 *                     type: number
 */
planRouter.get("/plans", planController.getPlans);

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Retorna um plano pelo ID
 *     tags:
 *       - Plans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do plano
 *     responses:
 *       200:
 *         description: Plano encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *       404:
 *         description: Plano não encontrado
 */
planRouter.get("/plans/:id", planController.getPlanById);

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Cria um novo plano
 *     tags:
 *       - Plans
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - valor
 *               - duracaoEmMes
 *             properties:
 *               nome:
 *                 type: string
 *               valor:
 *                  type: number
 *               duracaoEmMes:
 *                 type: number
 *               
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
planRouter.post("/plans", planController.createPlan);

/**
 * @swagger
 * /plans/{id}:
 *   put:
 *     summary: Atualiza um plano pelo ID
 *     tags:
 *       - Plans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do plano
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plano atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Plano não encontrado
 */
planRouter.put("/plans/:id", planController.updatePlan);

/**
 * @swagger
 * /plans/{id}:
 *   delete:
 *     summary: Remove um plano pelo ID
 *     tags:
 *       - Plans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do plano
 *     responses:
 *       200:
 *         description: Plano removido com sucesso
 *       404:
 *         description: Plano não encontrado
 */
planRouter.delete("/plans/:id", planController.deletePlan);

export default planRouter;
