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
  fetch("http://localhost:3009/tarefas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: Task[]) => {
      data.forEach((task: Task) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox";
        checkbox.name = "checkbox";
        checkbox.checked = task.completed; // Define o estado do checkbox com base na tarefa
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            taskItem.style.textDecoration = "line-through";
            fetch(`http://localhost:3009/tarefas/${task.id}`),
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  completed: true,
                }),
              };
          } else {
            taskItem.style.textDecoration = "none";
          }
        });
      });
    });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // evita o recarregamento automatico da página ao enviar o formulário
  const taskText = taskInput.value.trim(); // remove espaços em branco do começo e do final da string

  fetch("http://localhost:3009/tarefas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: taskText,
      description: "",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Tarefa criada com sucesso:", data);
      carregarTarefas();
    })
    .catch((error) => {
      console.error("Erro ao criar a tarefa:", error);
    });
});
