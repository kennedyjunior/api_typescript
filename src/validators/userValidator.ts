import { optional, z } from "zod";

export const createUserSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  idade: z.number().int().positive("A idade deve ser um número inteiro positivo"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(8, "Telefone inválido").optional(),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").optional(),
  planoAluno: z.int().optional(),
  treinadorResponsavelId: z.number().int().positive("ID do treinador responsável deve ser um número inteiro positivo").optional(),
});

export const updateUserSchema = z.object({
  nome: z.string().min(1).optional(),
  idade: z.number().int().positive().optional(),
  email: z.string().email().optional(),
  telefone: z.string().min(8).optional(),
  senha: z.string().min(6).optional(),  
  planoAluno: z.int().optional()
});
