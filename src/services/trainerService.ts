import prisma from "../db/prisma";
import { Trainer } from "../generated/prisma";

interface TrainerCreateData {
  nome: string;
  idade: number;
  email: string;
  telefone: string;
}

interface TrainerUpdateData {
  nome?: string;
  idade?: number;
  email?: string;
  telefone?: string;
}

const trainerService = {
  async getTrainer(): Promise<Trainer[]> {
    return prisma.trainer.findMany();
  },

  async getTrainerById(id: number): Promise<Trainer | null> {
    return prisma.trainer.findUnique({ where: { id }, include: { alunos: true } });
  },

  async createTrainer(data: TrainerCreateData): Promise<Trainer> {
    return prisma.trainer.create({ data });
  },

  async updateTrainer(id: number, data: TrainerUpdateData): Promise<Trainer> {
    return prisma.trainer.update({ where: { id }, data });
  },

  async deleteTrainer(id: number): Promise<void> {
    await prisma.trainer.delete({ where: { id } });
  },
};

export default trainerService;