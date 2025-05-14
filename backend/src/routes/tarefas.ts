import { response, Router } from "express";

const tarefas = Router();


tarefas.get("/", (request, response): => {
    return response.json("ok");
});

export { tarefas };
