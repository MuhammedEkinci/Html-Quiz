
//DOMS
var timerEl = document.getElementById("#timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var submitScoreButton = document.getElementById("submitScore-btn");
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');


//---------questions-----------//
const questions = [
    {
        question: 'what is 10 * 20?',
        answers: [
            {text: "20", correct: false},
            {text: '200', correct: true},
            {text: '500', correct:false},
            {text: '2000', correct: false}
        ]
    },
    {
        question: 'what is the capital city of the United Sates?',
        answers: [
            {text: "Washington D.C", correct: true},
            {text: 'Trump Towers', correct: false},
            {text: 'New York City', correct:false},
            {text: 'Newark', correct: false}
        ]
    },
    {
        question: 'How many elements can the avatar bend?',
        answers: [
            {text: "four", correct: true},
            {text: 'three', correct: false},
            {text: 'five', correct:false},
            {text: 'fifteen', correct: false}
        ]
    },
    {
        question: 'Who is John?',
        answers: [
            {text: "The last Jedi", correct: false},
            {text: 'The avatar', correct: false},
            {text: 'Our instructor', correct: true},
            {text: 'Morgan Freeman', correct: true}
        ]
    }
]

//------------global variables-------------//
let quizQuestions, currentQuestionIndex;
let score = 0;
var c = 100;
var t;


//----------Event-Listeners--------------//
startButton.addEventListener('click', function() {
    startGame();
});
nextButton.addEventListener('click', () => {
    //moves to next question in array object
    currentQuestionIndex++;
    setNextQuestion();
});

//resets everything including score
function startGame() {
    startButton.classList.add('hide');
    submitScoreButton.classList.add('hide');
    score = 0;
    quizQuestions = questions;
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

//function that displays the next question
function setNextQuestion() {
    resetState();
    showQuestion(quizQuestions[currentQuestionIndex]);
}

//displays questions and their answers
function showQuestion(question) {
    questionElement.innerText = question.question;

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        // if the answer is correct it will put true in the data attribute instead of false
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

//removes the default buttons in the previous question and adds the new answer buttons
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

//this function will determine if asnwers selected is correct or not
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    
    // If there are more questions then click next until there are none
    if (quizQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
      } 
      else {
        //startButton.innerText = 'Restart';
        //startButton.classList.remove('hide');
        submitScoreButton.classList.remove('hide');
      }

    // If the right answer is selected than add points
    if(selectedButton.dataset = correct){
        score += 10;
    }
    console.log(score);

}

//checks if the asnwer slected is the right answer 
function setStatusClass(element, correct) {
    clearStatusClass(element);

    if(correct) {
        element.classList.add('correct');
    }
    else {
        element.classList.add('wrong');
    }
}

//this function takes the element we are going to clear status on
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');

}


//-----------timer function-------------//
function timedCount() {
    if(c == 185){
        return false;
    }

    var hours = parseInt(c / 3600) % 24;
    var minutes = parseInt( c / 60 ) % 60;
    var seconds = c % 60;
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);  

    timerEl.innerHTML(result);

    if(c == 0) {
        timerEl.innerHTML("Times UP!!!");
    }

    c = c - 1;
    t = setTimeout(function()
    {
        timedCount()
    },1000);
}



