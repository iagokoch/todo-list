import express from "express";
import { PrismaClient } from "@prisma/client";

// Cria uma instância da aplicação Express
const app = express();
const prisma = new PrismaClient();

// Middleware para processar JSON
app.use(express.json());

// Rotas de autenticação

// Define a porta em que o servidor vai rodar
// Você pode usar uma variável de ambiente ou um valor fixo
const PORT = process.env.PORT || 3000;

// Uma rota de exemplo para testar
app.get("/", (req, res) => {
  res.send("Olá do backend da TODO list!");
});

// Inicia o servidor para escutar na porta definida
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
