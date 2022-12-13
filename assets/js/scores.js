var highscoresList = document.querySelector("#highscores");
function displayNewHighscore() {
    var li = document.createElement("li");
    var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("highscore");
    li.textContent = initials + " - " + score;
    highscoresList.appendChild(li);
}
displayNewHighscore();
