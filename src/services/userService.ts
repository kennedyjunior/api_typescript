import prisma from "../db/prisma";
import { User } from "../generated/prisma";

interface UserCreateData {
  nome: string;
  idade: number;
  email: string;
  telefone: string;
}

interface UserUpdateData {
  nome?: string;
  idade?: number;
  email?: string;
  telefone?: string;
}

const userService = {
  async getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  },

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async createUser(data: UserCreateData): Promise<User> {
    return prisma.user.create({ data });
  },

  async updateUser(id: number, data: UserUpdateData): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  },
};

export default userService;