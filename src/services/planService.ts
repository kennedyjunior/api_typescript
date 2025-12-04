import prisma from "../db/prisma";
import { Plan } from "@prisma/client";

interface PlanCreateData {
  nome: string;
  valor: number;
  duracaoEmMes: number;
}

interface PlanUpdateData {
  nome?: string;
  valor?: number;
  duracaoEmMes?: number;
}

const planService = {
  async getPlan(): Promise<Plan[]> {
    return prisma.plan.findMany();
  },

  async getPlanById(id: number): Promise<Plan | null> {
    return prisma.plan.findUnique({ where: { id } });
  },

  async createPlan(data: PlanCreateData): Promise<Plan> {
    return prisma.plan.create({ data });
  },

  async updatePlan(id: number, data: PlanUpdateData): Promise<Plan> {
    return prisma.plan.update({ where: { id }, data });
  },

  async deletePlan(id: number): Promise<void> {
    await prisma.plan.delete({ where: { id } });
  },
};

export default planService;