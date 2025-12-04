import prisma from "../db/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

interface UserCreateData {
  nome: string;
  idade: number;
  email: string;
  telefone: string;
  senha: string;
  planoAluno?: number; 
  treinadorResponsavelId: number;
}

interface UserUpdateData {
  nome?: string;
  idade?: number;
  email?: string;
  telefone?: string;
  senha?: string;
  planoAluno?: number; 
}

const userService = {
  async getUsers(): Promise<any[]> {
    return prisma.user.findMany({
      select:{
        id: true,
        nome: true,
        idade: true,  
        email: true,
        telefone: true,
      Plan:{
        select:{
        id: true,        
        nome: true,
        valor: true,  
        },
      },
      Trainer:{
        select:{
          id: true,
          nome: true,
        },
      },
    },
  });
},


  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
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