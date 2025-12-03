import { Router } from "express";
import { register, login } from "../controllers/authController";
import trainerController from "../controllers/trainerController";

const router = Router();

// Rotas de usuário
router.post("/register", register);
router.post("/login", login);

// Rotas de treinador
router.post("/trainer/register", trainerController.trainerRegister);
router.post("/trainer/login", trainerController.trainerLogin);

export default router;
