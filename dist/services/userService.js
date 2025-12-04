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
const prisma_1 = __importDefault(require("../db/prisma"));
const userService = {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.findMany({
                select: {
                    id: true,
                    nome: true,
                    idade: true,
                    email: true,
                    telefone: true,
                    Plan: {
                        select: {
                            id: true,
                            nome: true,
                            valor: true,
                        },
                    },
                    Trainer: {
                        select: {
                            id: true,
                            nome: true,
                        },
                    },
                },
            });
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.findUnique({ where: { id } });
        });
    },
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.findUnique({ where: { email } });
        });
    },
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.create({ data });
        });
    },
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.user.update({ where: { id }, data });
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.user.delete({ where: { id } });
        });
    },
};
exports.default = userService;
