import { response, Router, request } from "express";

const tarefas = Router();


tarefas.get("/", (request, response): => {
    return response.json("ok");
});

export { tarefas };
