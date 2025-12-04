"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainerController_1 = __importDefault(require("../controllers/trainerController"));
const trainerRouter = (0, express_1.Router)();
/**
 * @swagger
 * /trainer:
 *   get:
 *     summary: Retorna todos os treinadores
 *     tags:
 *       - Trainers
 *     responses:
 *       200:
 *         description: Lista de treinadores
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
 */
trainerRouter.get("/trainer", trainerController_1.default.getTrainer);
/**
 * @swagger
 * /trainer/{id}:
 *   get:
 *     summary: Retorna um treinador pelo ID e todos seus alunos
 *     tags:
 *       - Trainers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do treinador
 *     responses:
 *       200:
 *         description: treinador encontrado
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
 *         description: treinador não encontrado
 */
trainerRouter.get("/trainer/:id", trainerController_1.default.getTrainerById);
/**
 * @swagger
 * /trainer:
 *   post:
 *     summary: Cria um novo treinador
 *     tags:
 *       - Trainers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - idade
 *               - email
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *               idade:
 *                  type: number
 *               email:
 *                 type: string
 *               telefone:
 *                  type: string
 *     responses:
 *       201:
 *         description: Treinador criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
trainerRouter.post("/trainer", trainerController_1.default.createTrainer);
/**
 * @swagger
 * /trainer/{id}:
 *   put:
 *     summary: Atualiza um trainador pelo ID
 *     tags:
 *       - Trainers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do treinador
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
 *         description: Treinador atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Treinador não encontrado
 */
trainerRouter.put("/trainer/:id", trainerController_1.default.updateTrainer);
/**
 * @swagger
 * /trainers/{id}:
 *   delete:
 *     summary: Remove um treinador pelo ID
 *     tags:
 *       - Trainers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do treinador
 *     responses:
 *       200:
 *         description: Treinador removido com sucesso
 *       404:
 *         description: Treinador não encontrado
 */
trainerRouter.delete("/trainers/:id", trainerController_1.default.deleteTrainer);
exports.default = trainerRouter;
