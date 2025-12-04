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
const planService_1 = __importDefault(require("../services/planService"));
const planValidator_1 = require("../validators/planValidator");
const planController = {
    getPlans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const plans = yield planService_1.default.getPlan();
            res.json(plans);
        });
    },
    getPlanById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            const plan = yield planService_1.default.getPlanById(id);
            if (!plan)
                return res.status(404).json({ message: "Plano não encontrado" });
            res.json(plan);
        });
    },
    createPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const validated = planValidator_1.createPlanSchema.parse(req.body);
                const plan = yield planService_1.default.createPlan(validated);
                res.status(201).json(plan);
            }
            catch (err) {
                res.status(400).json({ message: (_a = err.errors) !== null && _a !== void 0 ? _a : err.message });
            }
        });
    },
    updatePlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            try {
                const validated = planValidator_1.updatePlanSchema.parse(req.body);
                if (Object.keys(validated).length === 0)
                    return res.status(400).json({ message: "Nenhum dado para atualizar" });
                const plan = yield planService_1.default.updatePlan(id, validated);
                res.json(plan);
            }
            catch (err) {
                if (err.code === "P2025")
                    return res.status(404).json({ message: "Plano não encontrado" });
                res.status(400).json({ message: (_a = err.errors) !== null && _a !== void 0 ? _a : err.message });
            }
        });
    },
    deletePlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0)
                return res.status(400).json({ message: "ID inválido" });
            try {
                yield planService_1.default.deletePlan(id);
                res.status(204).send();
            }
            catch (err) {
                if (err.code === "P2025")
                    return res.status(404).json({ message: "Plano não encontrado" });
                res.status(400).json({ message: err.message });
            }
        });
    },
};
exports.default = planController;
