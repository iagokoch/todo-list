import { Response, Router, Request } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const tarefas = Router();
tarefas.use(bodyParser.json());
const prisma = new PrismaClient();

tarefas.post("/", async (req: Request, res: Response) => {
  console.log("POST recebido:", req.body);
  const { title, description } = req.body;
  try {
    const novaTrarefa = await prisma.task.create({
      data: {
        title: title,
        description: description,
        completed: false,
      },
    });
    res.status(201).json({
      message: "Tarefa criada com exito",
      tarefa: novaTrarefa,
    });
  } catch (error) {
    console.error("Erro ao criar tarefa: ", error);
    res.status(500).json({
      error: "Erro ao criar tarefa",
    });
  }
});

tarefas.get("/", async (req: Request, res: Response) => {
  try {
    const tarefas = await prisma.task.findMany();
    res.status(200).json({
      message: "Tarefas encontradas com sucesso",
      tarefas: tarefas,
    });
  } catch (error) {
    console.error("Erro ao buscar as tarefas", error);
    res.status(500).json({
      error: "Erro ao buscar as tarefas",
    });
  }
});

export { tarefas };
