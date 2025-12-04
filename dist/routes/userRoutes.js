"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuários
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
router.get("/users", userController_1.default.getUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
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
 *         description: Usuário não encontrado
 */
router.get("/users/:id", userController_1.default.getUserById);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Users
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
 *               senha:
 *                 type: string
 *               planoAluno:
 *                type: integer
 *               treinadorResponsavelId:
 *                  type: number
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/users", userController_1.default.createUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário
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
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/users/:id", userController_1.default.updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/users/:id", userController_1.default.deleteUser);
exports.default = router;
