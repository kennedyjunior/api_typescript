import { Request, Response } from "express";
import planService from "../services/planService";
import { createPlanSchema, updatePlanSchema } from "../validators/planValidator";

const planController = {
  async getPlans(req: Request, res: Response) {
    const plans = await planService.getPlan();
    res.json(plans);
  },

  async getPlanById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    const plan = await planService.getPlanById(id);
    if (!plan) return res.status(404).json({ message: "Plano não encontrado" });

    res.json(plan);
  },

  async createPlan(req: Request, res: Response) {
    try {
      const validated = createPlanSchema.parse(req.body);
      const plan = await planService.createPlan(validated);
      res.status(201).json(plan);
    } catch (err: any) {
      res.status(400).json({ message: err.errors ?? err.message });
    }
  },

  async updatePlan(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    try {
      const validated = updatePlanSchema.parse(req.body);
      if (Object.keys(validated).length === 0) return res.status(400).json({ message: "Nenhum dado para atualizar" });

      const plan = await planService.updatePlan(id, validated);
      res.json(plan);
    } catch (err: any) {
      if (err.code === "P2025") return res.status(404).json({ message: "Plano não encontrado" });
      res.status(400).json({ message: err.errors ?? err.message });
    }
  },

  async deletePlan(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    try {
      await planService.deletePlan(id);
      res.status(204).send();
    } catch (err: any) {
      if (err.code === "P2025") return res.status(404).json({ message: "Plano não encontrado" });
      res.status(400).json({ message: err.message });
    }
  },
};

export default planController;
