import { Request, Response } from "express";
import userService from "../services/userService";
import { createUserSchema, updateUserSchema } from "../validators/userValidator";

const userController = {
  async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json(users);
  },

  async getUserById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.json(user);
  },

  async createUser(req: Request, res: Response) {
    try {
      const validated = createUserSchema.parse(req.body);
      const user = await userService.createUser(validated);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.errors ?? err.message });
    }
  },

  async updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    try {
      const validated = updateUserSchema.parse(req.body);
      if (Object.keys(validated).length === 0) return res.status(400).json({ message: "Nenhum dado para atualizar" });

      const user = await userService.updateUser(id, validated);
      res.json(user);
    } catch (err: any) {
      if (err.code === "P2025") return res.status(404).json({ message: "Usuário não encontrado" });
      res.status(400).json({ message: err.errors ?? err.message });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) return res.status(400).json({ message: "ID inválido" });

    try {
      await userService.deleteUser(id);
      res.status(204).send();
    } catch (err: any) {
      if (err.code === "P2025") return res.status(404).json({ message: "Usuário não encontrado" });
      res.status(400).json({ message: err.message });
    }
  },
};

export default userController;
