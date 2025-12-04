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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const userService_1 = __importDefault(require("../services/userService"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, email, senha, idade, telefone, treinadorResponsavelId } = req.body;
        const userExists = yield userService_1.default.getUserByEmail(email);
        if (userExists)
            return res.status(400).json({ message: "Usuário já existe" });
        const hash = yield bcryptjs_1.default.hash(senha, 10);
        const user = yield userService_1.default.createUser({
            nome,
            email,
            senha: hash,
            idade,
            telefone,
            treinadorResponsavelId
        });
        return res.status(201).json({ message: "Usuário criado", user });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro no registro" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        const user = yield userService_1.default.getUserByEmail(email);
        if (!user)
            return res.status(404).json({ message: "Usuário não encontrado" });
        const senhaOk = yield bcryptjs_1.default.compare(senha, user.senha);
        if (!senhaOk)
            return res.status(401).json({ message: "Credenciais inválidas" });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwt_1.jwtConfig.secret, { expiresIn: "1h" });
        return res.json({ message: "Login feito", token });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro no login" });
    }
});
exports.login = login;
