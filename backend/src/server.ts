import express from "express";
import { PrismaClient } from "@prisma/client";
import { tarefas } from "./routes/tarefas";
import cors from "cors";

// Cria uma instância da aplicação Express
const app = express();
const prisma = new PrismaClient();

// Middleware para processar JSON
app.use(express.json());

app.use("/tarefas", tarefas);

app.use(cors());

// Rotas de autenticação

// Define a porta em que o servidor vai rodar
// Você pode usar uma variável de ambiente ou um valor fixo
const PORT = process.env.PORT || 3009;

// Inicia o servidor para escutar na porta definida
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
