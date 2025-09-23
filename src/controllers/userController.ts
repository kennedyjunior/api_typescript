import { Request, Response } from "express";
import userService from "../services/userService";
import { User } from "../generated/prisma";

const userController = {
    async getUsers(req: Request, res: Response): Promise<void> {
        const users: User[] = await userService.getUsers();
        res.json(users);
    },

    async getUserById(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
            return;
        }

        const user: User | null = await userService.getUserById(id);
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }

        res.json(user);
    },

    async createUser(req: Request, res: Response): Promise<void> {
        const { nome, idade }: { nome: string; idade: number } = req.body;

        if (typeof nome !== 'string' || nome.trim() === "") {
            res.status(400).json({ message: "O nome é obrigatório e não pode estar vazio." });
            return;
        }
        if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
            res.status(400).json({ message: "A idade é obrigatória e deve ser um número inteiro positivo." });
            return;
        }

        try {
            const user: User = await userService.createUser({ nome, idade });
            res.status(201).json(user);
        } catch (error) {
            res.status(409).json({ message: "Já existe um usuário com este nome." });
        }
    },

    async updateUser(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
            return;
        }

        const { nome, idade }: { nome?: string; idade?: number } = req.body;
        const dataToUpdate: { nome?: string; idade?: number } = {};

        if (nome !== undefined) {
            if (typeof nome !== 'string' || nome.trim() === "") {
                res.status(400).json({ message: "O nome, se fornecido, não pode estar vazio." });
                return;
            }
            dataToUpdate.nome = nome;
        }

        if (idade !== undefined) {
            if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
                res.status(400).json({ message: "A idade, se fornecida, deve ser um número inteiro positivo." });
                return;
            }
            dataToUpdate.idade = idade;
        }

        if (Object.keys(dataToUpdate).length === 0) {
            res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido (nome ou idade)." });
            return;
        }

        try {
            const user: User = await userService.updateUser(id, dataToUpdate);
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    },

    async deleteUser(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
            return;
        }

        try {
            await userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    },
};

export default userController;