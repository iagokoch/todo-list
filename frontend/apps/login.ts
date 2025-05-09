const bemVindoElement = document.getElementById("bemVindo");

if (bemVindoElement) {
  const jaVisitou = localStorage.getItem("jaVisitou");

  if (jaVisitou === null) {
    bemVindoElement.textContent = "Bem Vindo!";
    localStorage.setItem("jaVisitou", "true");
  } else {
    bemVindoElement.textContent = "Bem Vindo Novamente!";
  }
}
