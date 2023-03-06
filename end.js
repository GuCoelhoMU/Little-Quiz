const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const pontuacaoMaisRecente = localStorage.getItem("pontuacaoMaisRecente");
finalScore.innerText = pontuacaoMaisRecente;


username.addEventListener("keyup", () =>{
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("Clicou em Salvar!");
    e.preventDefault();
};
