var nameInput = document.querySelector("#e-text");
var nameForm = document.querySelector("#name-form");
var scoreList = document.querySelector("#score-list");

var submitButton = document.getElementById("#submit-btn");

var scoreboard = [];

init();


function init() {
    var storedScores = JSON.parse(localStorage.getItem("scoreboard"));

    if (storedScores !== null) {
        scoreboard = storedScores;
    }

    renderScore();
}

function renderScore() {
    scoreList.innerHTML = "";

    for(var i = 0; i < scoreboard.length; i++) {
        var score = scoreboard[i];

        var li = document.createElement("li");
        li.textContent = score;
        li.setAttribute("data-index", i);

        scoreList.appendChild(li);
    }
}

function storeScores() {
    // Stringify and set "scoreboard" key in localStorage to todos array
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

nameForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var scoreText = nameInput.value.trim();

    if(scoreText === null) {
        return;
    }

    scoreList.push(scoreText);
    nameInput.value = "";

    storeScores();
    renderScore();
});


