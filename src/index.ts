import express, { Express } from "express";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from "./swagger";

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(userRoutes);

setupSwagger(app);

app.listen(port, () => {
  console.log(`API da academia rodando na porta ${port}`);
  console.log(`Swagger UI disponível em http://localhost:${port}/api-docs`);
});
