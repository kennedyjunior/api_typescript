"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const planRoutes_1 = __importDefault(require("./routes/planRoutes"));
const trainerRoutes_1 = __importDefault(require("./routes/trainerRoutes"));
const swagger_1 = require("./swagger");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({
    origin: 'https://api-typescript-pi.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use(userRoutes_1.default);
app.use(planRoutes_1.default);
app.use(trainerRoutes_1.default);
app.use("/auth", authRoutes_1.default);
(0, swagger_1.setupSwagger)(app);
app.listen(port, () => {
    console.log(`API da academia rodando na porta ${port}`);
    console.log(`Swagger UI disponível em http://localhost:${port}/api-docs`);
});
exports.default = app;
