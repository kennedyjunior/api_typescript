import { z } from "zod";

export const createTrainerSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  idade: z.number().int().positive("A idade deve ser um número inteiro positivo"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
});

export const updateTrainerSchema = z.object({
  nome: z.string().min(1).optional(),
  idade: z.number().int().positive().optional(),
  email: z.string().email().optional(),
  telefone: z.string().min(8).optional(),
});