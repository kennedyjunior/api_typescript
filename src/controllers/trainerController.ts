import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import prisma from "../db/prisma";
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

  async trainerRegister(req: Request, res: Response) {
    try {
      const { nome, email, senha, telefone, idade } = req.body;

      const trainerExists = await prisma.trainer.findUnique({ where: { email } });
      if (trainerExists) return res.status(400).json({ message: "Treinador já existe" });

      const hash = await bcrypt.hash(senha, 10);

      const trainer = await prisma.trainer.create({
        data: {
          nome,
          idade,
          email,
          senha: hash,
          telefone
        }
      });

      return res.status(201).json({ message: "Treinador criado", trainer });
    } catch (err: any) {
      console.error(err); // Para debug
      return res.status(500).json({ error: err.message || "Erro no registro do treinador" });
    }
  },

  async trainerLogin(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const trainer = await prisma.trainer.findUnique({ where: { email } });
      if (!trainer) return res.status(404).json({ message: "Treinador não encontrado" });

      const senhaOk = await bcrypt.compare(senha, trainer.senha);
      if (!senhaOk) return res.status(401).json({ message: "Credenciais inválidas" });

      const token = jwt.sign({ id: trainer.id, email: trainer.email, role: "trainer" }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn
      });

      return res.json({ message: "Login do treinador feito", token });
    } catch (err) {
      return res.status(500).json({ error: "Erro no login do treinador" });
    }
  }
};

export default trainerController;
