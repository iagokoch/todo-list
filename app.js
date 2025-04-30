"use strict";
const taskInput = document.getElementById("taskInput"); // pega o input e transforma em um input HTML, HTMLInputElement Serve para o TypeScript saber que você está lidando com um <input> e liberar o uso correto das suas propriedades.
const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // evita o recarregamento automatico da página ao enviar o formulário
    const taskText = taskInput.value.trim(); // remove os espaços em branco do começo e do final da string
    if (taskText !== "") {
        //cria um novo li
        const taskItem = document.createElement("li");
        //cria um checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                taskItem.style.textDecoration = "line-through"; // adiciona o risco na tarefa
            }
            else {
                taskItem.style.textDecoration = "none"; // remove o risco na tarefa
            }
        });
        //cria um span para o texto da tarefa
        const span = document.createElement("span");
        span.textContent = taskText; // adiciona o texto da tarefa ao span
        //cria um botão de remover
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remover"; // adiciona o texto do botão
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(taskItem); // remove a tarefa da lista
        });
        //adiciona o checkbox, o span e o botão de remover ao li
        taskItem.appendChild(checkbox); // adiciona o checkbox ao li
        taskItem.appendChild(span); // adiciona o span ao li
        taskItem.appendChild(deleteButton); // adiciona o botão de remover ao li
        //adiciona o li à lista de tarefas
        taskList.appendChild(taskItem); // adiciona o li à lista de tarefas
        //limpa o input
        taskInput.value = ""; // limpa o input
    }
});
