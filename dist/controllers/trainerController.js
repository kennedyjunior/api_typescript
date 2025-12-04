"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const prisma_1 = __importDefault(require("../db/prisma"));
const trainerService_1 = __importDefault(require("../services/trainerService"));
const trainerValidator_1 = require("../validators/trainerValidator");
const trainerController = {
    getTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainers = yield trainerService_1.default.getTrainer();
            res.json(trainers);
        });
    },
    getTrainerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            const trainer = yield trainerService_1.default.getTrainerById(id);
            if (!trainer)
                return res.status(404).json({ message: "Teinador não encontrado" });
            res.json(trainer);
        });
    },
    createTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const validated = trainerValidator_1.createTrainerSchema.parse(req.body);
                const trainer = yield trainerService_1.default.createTrainer(validated);
                res.status(201).json(trainer);
            }
            catch (err) {
                res.status(400).json({ message: (_a = err.errors) !== null && _a !== void 0 ? _a : err.message });
            }
        });
    },
    updateTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            try {
                const validated = trainerValidator_1.updateTrainerSchema.parse(req.body);
                if (Object.keys(validated).length === 0)
                    return res.status(400).json({ message: "Nenhum dado para atualizar" });
                const trainer = yield trainerService_1.default.updateTrainer(id, validated);
                res.json(trainer);
            }
            catch (err) {
                if (err.code === "P2025")
                    return res.status(404).json({ message: "Treiandor não encontrado" });
                res.status(400).json({ message: (_a = err.errors) !== null && _a !== void 0 ? _a : err.message });
            }
        });
    },
    deleteTrainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            try {
                yield trainerService_1.default.deleteTrainer(id);
                res.status(204).send();
            }
            catch (err) {
                if (err.code === "P2025")
                    return res.status(404).json({ message: "Treinador não encontrado" });
                res.status(400).json({ message: err.message });
            }
        });
    },
    trainerRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, email, senha, telefone, idade } = req.body;
                const trainerExists = yield prisma_1.default.trainer.findUnique({ where: { email } });
                if (trainerExists)
                    return res.status(400).json({ message: "Treinador já existe" });
                const hash = yield bcryptjs_1.default.hash(senha, 10);
                const trainer = yield prisma_1.default.trainer.create({
                    data: {
                        nome,
                        idade,
                        email,
                        senha: hash,
                        telefone
                    }
                });
                return res.status(201).json({ message: "Treinador criado", trainer });
            }
            catch (err) {
                console.error(err); // Para debug
                return res.status(500).json({ error: err.message || "Erro no registro do treinador" });
            }
        });
    },
    trainerLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, senha } = req.body;
                const trainer = yield prisma_1.default.trainer.findUnique({ where: { email } });
                if (!trainer)
                    return res.status(404).json({ message: "Treinador não encontrado" });
                const senhaOk = yield bcryptjs_1.default.compare(senha, trainer.senha);
                if (!senhaOk)
                    return res.status(401).json({ message: "Credenciais inválidas" });
                const token = jsonwebtoken_1.default.sign({ id: trainer.id, email: trainer.email }, jwt_1.jwtConfig.secret, { expiresIn: "1h" });
                return res.json({ message: "Login do treinador feito", token });
            }
            catch (err) {
                return res.status(500).json({ error: "Erro no login do treinador" });
            }
        });
    }
};
exports.default = trainerController;
