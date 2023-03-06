const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion ={};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions=[];

let questions = [
    {
        question:"Quem é o atual presidente dos Estados Unidos?",
        choice1: "Lula",
        choice2: "Luffy",
        choice3: "Biden",
        choice4: "Manoel Gomes",
        answer: 3
    },
    {
        question:"Em que ano foi lançado o Playstation 4?",
        choice1: "2013",
        choice2: "1988",
        choice3: "2014",
        choice4: "2011",
        answer: 1
    },
    {
        question:"Quem é o atual maior pontuador de todos os tempos da NBA?",
        choice1: "Michael Jordan",
        choice2: "Lionel Messi",
        choice3: "Rafael Lange",
        choice4: "Lebron James",
        answer: 4
    }
];

//constantes

const BONUS = 10;
const MAXQ = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
};

getNewQuestion = () =>{
    if(availableQuestions.length === 0 | questionCounter>= MAXQ ){
        localStorage.setItem("pontuacaoMaisRecente", score)
        return window.location.assign("/end.html");//quando terminar as perguntas, irá retornar ao menu :)
    }
    
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAXQ;//Atualiza dinamicamente o numero da questao xD

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice =>{
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'correct' ){
            incrementScore(BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();
