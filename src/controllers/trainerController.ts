import { Request, Response } from "express";
import trainerService from "../services/trainerService";
import { createTrainerSchema, updateTrainerSchema } from "../validators/trainerValidator";

const trainerController = {
  async getTrainer(req: Request, res: Response) {
    const trainers = await trainerService.getTrainer();
    res.json(trainers);
  },

  async getTrainerById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    const trainer = await trainerService.getTrainerById(id);
    if (!trainer) return res.status(404).json({ message: "Teinador não encontrado" });

    res.json(trainer);
  },

  async createTrainer(req: Request, res: Response) {
    try {
      const validated = createTrainerSchema.parse(req.body);
      const trainer = await trainerService.createTrainer(validated);
      res.status(201).json(trainer);
    } catch (err: any) {
      res.status(400).json({ message: err.errors ?? err.message });
    }
  },

  async updateTrainer(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    try {
      const validated = updateTrainerSchema.parse(req.body);
      if (Object.keys(validated).length === 0) return res.status(400).json({ message: "Nenhum dado para atualizar" });

      const trainer = await trainerService.updateTrainer(id, validated);
      res.json(trainer);
    } catch (err: any) {
      if (err.code === "P2025") return res.status(404).json({ message: "Treiandor não encontrado" });
      res.status(400).json({ message: err.errors ?? err.message });
    }
  },

  async deleteTrainer(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    try {
      await trainerService.deleteTrainer(id);
      res.status(204).send();
    } catch (err: any) {
      if (err.code === "P2025") return res.status(404).json({ message: "Treinador não encontrado" });
      res.status(400).json({ message: err.message });
    }
  },
};

export default trainerController;
