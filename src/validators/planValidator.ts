import { z } from "zod";

export const createPlanSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  valor: z.number().int().positive("A valor deve ser um número inteiro positivo"),
  duracaoEmMes: z.number().int().positive("A duração deve ser um número inteiro positivo")
});

export const updatePlanSchema = z.object({
  nome: z.string().min(1).optional(),
  valor: z.number().int().positive().optional(),
  duracaoEmMes: z.number().int().positive().optional(),
});