// DDM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart-quiz");
const progressBar = document.getElementById("progress");

//Quiz questions 
const quizQuestions = [
    {
        question: "What is the capital of India?",
        answers: [
            {text: "Nagpur", correct: false},
            {text: "Mumbai", correct: false},
            {text: "Delhi", correct: true},
            {text: "Rajasthan", correct: false},
        ],
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        answers: [
            {text: "Elephant", correct: false},
            {text: "Lion", correct: true},
            {text: "Monkey", correct: false},
            {text: "Zebra", correct: false},
        ],
    },
    {
        question: "What is the name of the planet we live on?",
        answers: [
            {text: "Mars", correct: false},
            {text: "Venus", correct: false},
            {text: "Earth", correct: true},
            {text: "Jupiter", correct: false},
        ],        
    },
    {
        question: "How many legs does a spider have?",
        answers: [
            {text: "Eight", correct: true},
            {text: "Four", correct: false},
            {text: "Six", correct: false},
            {text: "Ten", correct: false},
        ],        
    },
    {
        question: "What do green plants need from the sun to help them grow big and strong?",
        answers: [
            {text: "Darkness", correct: false},
            {text: "Sunlight", correct: true},
            {text: "Cold", correct: false},
            {text: "Sand", correct: false},
        ],        
    },
];

//Quiz State Vars

let currentQuestionIndex = 0; 
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    ///resent vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1; 

    const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct  === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score 
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    },1000)
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if(percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if(percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if(percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep Learning!";
    } else if(percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}
function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}