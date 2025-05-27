"use strict";
// app.ts - VERSÃO COM LOGS E CATCH
document.addEventListener("DOMContentLoaded", () => {
    console.log(">>> DOMContentLoaded - O HTML está pronto. Iniciando o script...");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");
    if (!taskInput || !taskList || !taskForm) {
        console.error("### ERRO CRÍTICO: Um ou mais elementos (taskInput, taskList, taskForm) não foram encontrados no HTML! ###");
        return;
    }
    else {
        console.log(">>> Elementos HTML (taskInput, taskList, taskForm) encontrados com sucesso.");
    }
    function adicionarTarefaAoDOM(task) {
        console.log(`   -> Adicionando '${task.title}' ao DOM.`);
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.dataset.taskId = task.id.toString();
        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox-${task.id}`; // ID ÚNICO
        checkbox.name = "checkbox";
        checkbox.checked = task.completed;
        if (task.completed)
            taskItem.style.textDecoration = "line-through";
        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.title;
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.type = "button";
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash");
        deleteButton.appendChild(icon);
        deleteButton.addEventListener("click", () => {
            console.log(`   -> Evento CLICK no botão DELETAR (ID: ${task.id})`);
            fetch(`http://localhost:3009/tarefas/${task.id}`, { method: "DELETE" })
                .then((response) => {
                if (response.ok) {
                    console.log(`      -> Sucesso DELETE ID: ${task.id}. Removendo do DOM.`);
                    taskList.removeChild(taskItem);
                }
                else {
                    console.error(`      -> Falha DELETE ID: ${task.id}. Status: ${response.status}`);
                }
            })
                .catch((err) => console.error(`### ERRO FETCH DELETE (ID: ${task.id}):`, err));
        });
        checkbox.addEventListener("change", () => {
            const isChecked = checkbox.checked;
            console.log(`   -> Evento CHANGE no checkbox (ID: ${task.id}). Marcado: ${isChecked}`);
            taskItem.style.textDecoration = isChecked ? "line-through" : "none";
            fetch(`http://localhost:3009/tarefas/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: isChecked }),
            })
                .then((response) => {
                if (!response.ok)
                    console.error(`      -> Falha PATCH ID: ${task.id}. Status: ${response.status}`);
                else
                    console.log(`      -> Sucesso PATCH ID: ${task.id}.`);
            })
                .catch((err) => console.error(`### ERRO FETCH PATCH (ID: ${task.id}):`, err));
        });
        taskItem.appendChild(checkbox);
        taskItem.appendChild(span);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
    function carregarTarefas() {
        console.log(">>> Chamando carregarTarefas()...");
        taskList.innerHTML = "";
        fetch("http://localhost:3009/tarefas", { method: "GET" })
            .then((response) => {
            console.log(">>> Resposta GET recebida:", response.status, response.statusText);
            if (!response.ok)
                throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
            .then((data) => {
            console.log(">>> Dados GET recebidos:", data);
            if (data && data.tarefas && Array.isArray(data.tarefas)) {
                data.tarefas.forEach((task) => {
                    adicionarTarefaAoDOM(task);
                });
                console.log(`>>> ${data.tarefas.length} tarefas carregadas e renderizadas.`);
            }
            else {
                console.warn(">>> Dados GET em formato inesperado ou sem tarefas:", data);
            }
        })
            .catch((error) => {
            console.error("### ERRO CRÍTICO no FETCH GET:", error);
        });
    }
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        console.log(`>>> Evento SUBMIT. Texto: '${taskText}'`);
        if (taskText !== "") {
            console.log(`   -> Tentando FETCH POST para '${taskText}'...`);
            fetch("http://localhost:3009/tarefas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: taskText,
                    description: "",
                    completed: false,
                }),
            })
                .then((response) => {
                console.log(">>> Resposta POST recebida:", response.status, response.statusText);
                if (!response.ok)
                    throw new Error(`Erro HTTP: ${response.status}`);
                return response.json();
            })
                .then((data) => {
                console.log(">>> Sucesso POST. Resposta:", data);
                taskInput.value = "";
                console.log(">>> Recarregando tarefas após POST...");
                carregarTarefas();
            })
                .catch((error) => {
                console.error("### ERRO CRÍTICO no FETCH POST:", error);
            });
        }
        else {
            console.log(">>> Evento SUBMIT ignorado (texto vazio).");
        }
    });
    carregarTarefas();
});
