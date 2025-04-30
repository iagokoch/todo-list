const taskInput = document.getElementById("taskInput") as HTMLInputElement; // pega o input e transforma em um input HTML, HTMLInputElement Serve para o TypeScript saber que você está lidando com um <input> e liberar o uso correto das suas propriedades.
const taskList = document.getElementById("taskList") as HTMLUListElement;
const taskForm = document.getElementById("taskForm") as HTMLFormElement;

taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // evita o recarregamento automatico da página ao enviar o formulário

  const taskText = taskInput.value.trim(); // remove os espaços em branco do começo e do final da string
  if (taskText !== "") {
    //cria um novo li
    const taskItem = document.createElement("li");

    //cria um checkbox
    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskItem.style.textDecoration = "line-through";
      } else {
        taskItem.style.textDecoration = "none";
      }
    });

    //cria um span para o texto da tarefa
    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = taskText;

    //cria um botão de remover
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    document.createElement("i");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash");
    deleteButton.appendChild(icon);
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(taskItem);
    });

    //adiciona o checkbox, o span e o botão de remover ao li
    taskItem.appendChild(checkbox);
    taskItem.appendChild(span);
    taskItem.appendChild(deleteButton);

    //adiciona o li à lista de tarefas
    taskList.appendChild(taskItem);

    //limpa o input
    taskInput.value = "";
  }
});
