import { z } from "zod";

export const createTrainerSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  idade: z.number().int().positive("A idade deve ser um número inteiro positivo"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const updateTrainerSchema = z.object({
  nome: z.string().min(1).optional(),
  idade: z.number().int().positive().optional(),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").optional(),
  email: z.string().email().optional(),
  telefone: z.string().min(8).optional(),
});