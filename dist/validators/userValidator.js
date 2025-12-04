"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "O nome é obrigatório"),
    idade: zod_1.z.number().int().positive("A idade deve ser um número inteiro positivo"),
    email: zod_1.z.string().email("Email inválido"),
    telefone: zod_1.z.string().min(8, "Telefone inválido"),
    senha: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    planoAluno: zod_1.z.int().optional(),
    treinadorResponsavelId: zod_1.z.number().int().positive("ID do treinador responsável deve ser um número inteiro positivo"),
});
exports.updateUserSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1).optional(),
    idade: zod_1.z.number().int().positive().optional(),
    email: zod_1.z.string().email().optional(),
    telefone: zod_1.z.string().min(8).optional(),
    senha: zod_1.z.string().min(6).optional(),
    planoAluno: zod_1.z.int().optional()
});
