interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const taskInput = document.getElementById("taskInput") as HTMLInputElement; // pega o input e transforma em um input HTML, HTMLInputElement Serve para o TypeScript saber que você está lidando com um <input> e liberar o uso correto das suas propriedades.
const taskList = document.getElementById("taskList") as HTMLUListElement;
const taskForm = document.getElementById("taskForm") as HTMLFormElement;

carregarTarefas();
function carregarTarefas() {
  taskList.innerHTML = "";
  fetch("http://localhost:3009/tarefas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.tarefas.forEach((task: Task) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.id = `task-${task.id}`;
        checkbox.name = "checkbox";
        checkbox.checked = task.completed;

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
          fetch(`http://localhost:3009/tarefas/${task.id}`, {
            method: "DELETE",
          }).then(() => {
            taskList.removeChild(taskItem);
          });
        });

        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            taskItem.style.textDecoration = "line-through";
            fetch(`http://localhost:3009/tarefas/${task.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                completed: true,
              }),
            });
          } else {
            taskItem.style.textDecoration = "none";
            fetch(`http://localhost:3009/tarefas/${task.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                completed: false,
              }),
            });
          }
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(span);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
      });
    });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    fetch("http://localhost:3009/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: taskText,
        description: "",
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        taskInput.value = "";
        carregarTarefas();
      });
  }
});
