const taskInput = document.getElementById("taskInput") as HTMLInputElement; // pega o input e transforma em um input HTML, HTMLInputElement Serve para o TypeScript saber que você está lidando com um <input> e liberar o uso correto das suas propriedades.
const taskBtn = document.getElementById("btn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const taskForm = document.getElementById("taskForm") as HTMLFormElement;

taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // evita o recarregamento automatico da página ao enviar o formulário
});
