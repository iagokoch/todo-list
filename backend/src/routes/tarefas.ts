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

tarefas.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const tarefaAtualizada = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        completed: completed,
      },
    });
    res.status(200).json({
      message: "Tarefa atualizada com sucesso",
      tarefa: tarefaAtualizada,
    });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({
      error: "Erro ao atualizar tarefa",
    });
  }
});

tarefas.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Tarefa deletada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    res.status(500).json({
      error: "Erro ao deletar tarefa",
    });
  }
});

tarefas.delete("/", async (req: Request, res: Response) => {
  try {
    await prisma.task.deleteMany();
    res.status(200).json({
      message: "Tarefas deletadas com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar tarefas:", error);
    res.status(500).json({
      error: "Erro ao deletar tarefas",
    });
  }
});

export { tarefas };
