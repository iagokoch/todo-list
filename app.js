"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskInput = document.getElementById("taskInput"); // pega o input e transforma em um input HTML, HTMLInputElement Serve para o TypeScript saber que você está lidando com um <input> e liberar o uso correto das suas propriedades.
var taskList = document.getElementById("taskList");
var taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", function (event) {
    event.preventDefault(); // evita o recarregamento automatico da página ao enviar o formulário
    var taskText = taskInput.value.trim(); // remove os espaços em branco do começo e do final da string
    if (taskText !== "") {
        //cria um novo li
        var taskItem_1 = document.createElement("li");
        //cria um checkbox
        var checkbox_1 = document.createElement("input");
        checkbox_1.type = "checkbox";
        checkbox_1.addEventListener("change", function () {
            if (checkbox_1.checked) {
                taskItem_1.style.textDecoration = "line-through"; // adiciona o risco na tarefa
            }
            else {
                taskItem_1.style.textDecoration = "none"; // remove o risco na tarefa
            }
        });
        //cria um span para o texto da tarefa
        var span = document.createElement("span");
        span.textContent = taskText; // adiciona o texto da tarefa ao span
        //cria um botão de remover
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Remover"; // adiciona o texto do botão
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem_1); // remove a tarefa da lista
        });
        //adiciona o checkbox, o span e o botão de remover ao li
        taskItem_1.appendChild(checkbox_1); // adiciona o checkbox ao li
        taskItem_1.appendChild(span); // adiciona o span ao li
        taskItem_1.appendChild(deleteButton); // adiciona o botão de remover ao li
        //adiciona o li à lista de tarefas
        taskList.appendChild(taskItem_1); // adiciona o li à lista de tarefas
        //limpa o input
        taskInput.value = ""; // limpa o input
    }
});
