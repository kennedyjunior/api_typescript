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
const userService_1 = __importDefault(require("../services/userService"));
const userValidator_1 = require("../validators/userValidator");
const userController = {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userService_1.default.getUsers();
            res.json(users);
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            const user = yield userService_1.default.getUserById(id);
            if (!user)
                return res.status(404).json({ message: "Usuário não encontrado" });
            res.json(user);
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const validated = userValidator_1.createUserSchema.parse(req.body);
                const user = yield userService_1.default.createUser(validated);
                res.status(201).json(user);
            }
            catch (err) {
                res.status(400).json({ message: (_a = err.errors) !== null && _a !== void 0 ? _a : err.message });
            }
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            try {
                const validated = userValidator_1.updateUserSchema.parse(req.body);
                if (Object.keys(validated).length === 0)
                    return res.status(400).json({ message: "Nenhum dado para atualizar" });
                const user = yield userService_1.default.updateUser(id, validated);
                res.json(user);
            }
            catch (err) {
                if (err.code === "P2025")
                    return res.status(404).json({ message: "Usuário não encontrado" });
                res.status(400).json({ message: (_a = err.errors) !== null && _a !== void 0 ? _a : err.message });
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            try {
                yield userService_1.default.deleteUser(id);
                res.status(204).send();
            }
            catch (err) {
                if (err.code === "P2025")
                    return res.status(404).json({ message: "Usuário não encontrado" });
                res.status(400).json({ message: err.message });
            }
        });
    },
};
exports.default = userController;
