import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import userService from "../services/userService"; 

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, idade, telefone, treinadorResponsavelId } = req.body;

    const userExists = await userService.getUserByEmail(email);
    if (userExists) return res.status(400).json({ message: "Usuário já existe" });

    const hash = await bcrypt.hash(senha, 10);

    const user = await userService.createUser({ 
      nome, 
      email, 
      senha: hash,
      idade,
      telefone,
      treinadorResponsavelId
    });

    return res.status(201).json({ message: "Usuário criado", user });
  } catch (err) {
    return res.status(500).json({ error: "Erro no registro" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const senhaOk = await bcrypt.compare(senha, user.senha);
    if (!senhaOk) return res.status(401).json({ message: "Credenciais inválidas" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtConfig.secret as jwt.Secret,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login feito", token });
  } catch (err) {
    return res.status(500).json({ error: "Erro no login" });
  }
};
