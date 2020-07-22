const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


let questions = [
  {
    question: "What is 2 * 20?",
    choice1: "40",
    choice2: "450",
    choice3: "Tomatoes",
    choice4: "4,000,000",
    answer: 1
  },
  {
    question:
      "what is the capital of the united States?",
    choice1: "Trump Towers",
    choice2: "Newark",
    choice3: "Washington D.C",
    choice4: "New York City",
    answer: 3
  },
  {
    question: "How many elements can the avatar conrtol?",
    choice1: "one",
    choice2: "ten",
    choice3: "none(because I have never wacthed avatar the last airbender)",
    choice4: "four",
    answer: 4
  },
  {
    question: "How many licks does it take to get to the center of a tootsie pop?",
    choice1: "one",
    choice2: "ten",
    choice3: "1,000,000",
    choice4: "unknown",
    answer: 4
  },
  {
    question: "Who is the strongest characater?",
    choice1: "Goku (from Dragon Ball Z)",
    choice2: "Superman",
    choice3: "The Avatar",
    choice4: "Neos (from Matrix)",
    answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    else if(classToApply === "incorrect"){
        timeleft -= 5;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

//-----------timer------------//
var timer = document.querySelector(".time");
var timeleft = 80;

function timeCounter() {
    var timerInterval = setInterval(function() {
        timeleft--;
        timer.textContent = timeleft;

        if(timeleft === 0) {
            localStorage.setItem("mostRecentScore", score);
            return window.location.assign("end.html");
        }
    }, 1000);
}

timeCounter();

startGame();