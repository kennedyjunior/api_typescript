"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlanSchema = exports.createPlanSchema = void 0;
const zod_1 = require("zod");
exports.createPlanSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "O nome é obrigatório"),
    valor: zod_1.z.number().int().positive("A valor deve ser um número inteiro positivo"),
    duracaoEmMes: zod_1.z.number().int().positive("A duração deve ser um número inteiro positivo")
});
exports.updatePlanSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1).optional(),
    valor: zod_1.z.number().int().positive().optional(),
    duracaoEmMes: zod_1.z.number().int().positive().optional(),
});
