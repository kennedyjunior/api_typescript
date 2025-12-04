import express, { Express } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import planRoutes from "./routes/planRoutes";
import trainerRoutes from "./routes/trainerRoutes";
import { setupSwagger } from "./swagger";
import authRoutes from "./routes/authRoutes";

const app: Express = express();
const port: number = 3000;

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(userRoutes);
app.use(planRoutes);
app.use(trainerRoutes);
app.use("/auth", authRoutes);

setupSwagger(app);

app.listen(port, () => {
  console.log(`API da academia rodando na porta ${port}`);
  console.log(`Swagger UI disponível em http://localhost:${port}/api-docs`);
});
export default app;