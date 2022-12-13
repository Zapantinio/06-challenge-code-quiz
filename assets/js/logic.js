//Selecting many required elements
var timeEl = document.querySelector(".timer");
var buttonEl = document.querySelector("#start");
var startEl = document.querySelector("#start-screen");
var wrapperEl = document.querySelector(".wrapper");
var h2El = document.querySelector("#question-title");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var highscoresEl = document.querySelector(".scores");
var endScreenEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");
var submitButtonEl = document.querySelector("#submit");
var userInitialsEl = document.querySelector("#initials");

//setting variables for the timer, the audio, and a global variable for the question numbers
var secs = 100;
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
var questionNum = 0;


//Start quiz when clicking button
buttonEl.addEventListener("click", function(event) {
    if (event.target.matches("button") === true) {
        var buttonClicked = event.target;

        //Deletes the content of the start screen
        startEl.textContent = "";

        //Starts the timer
        timer();

        //Displays the first question
        question(questionNum);
    }

})

//Main function of the program
function question(questionNum) {

    //Makes the questions element of the html file visible
    questionsEl.setAttribute("class", "visible");

    //Makes the h2 tag show the question
    h2El.textContent = window.questions[questionNum].title

    //Creates an ordered list which is appended to the start screen
    var ol = document.createElement("ol");
    choicesEl.appendChild(ol);

    //Loop to create a list of buttons each one having the answers to the question
    for (i = 0; i < window.questions[i].choices.length; i++) {
        var li = document.createElement("li");
        ol.appendChild(li);
        
        //Create buttons for each listed element which include the possible answers
        var button = document.createElement("button");
        button.dataset.index = i;
        li.appendChild(button);
        button.textContent = window.questions[questionNum].choices[i];  
        button.value = window.questions[questionNum].choices[i];
        
        //Event listener that checks when the button is clicked and if so executes the following code
        button.addEventListener("click", function(event) {
            if (event.target.matches("button") === true) {
                var correctAnswer = window.questions[questionNum].answer;
                var buttonClicked = event.target.value;

                //If the button which was clicked contains the correct answer, the question number iterates and a sound is played
                if (buttonClicked === correctAnswer) {
                        questionNum++;
                        choicesEl.textContent = "";
                        sfxRight.play();
                    //If the question number is less than 5, then the function is executed again
                    if (questionNum < 5) {
                        question(questionNum);
                    //Otherwise, the timer gets scored as the score
                    } else {
                        questionsEl.textContent = "";
                        localStorage.setItem("highscore", secs);
                        //The function isFinished is executed which always returns true
                        isFinished();
                        //The highscores function is executed which takes us to the high scores screen
                        highscores();
                    }
                //If the button which was clicked contains the wrong answer, the question number iterates and a sound is played. Timer gets reduced by 15 seconds
                } else {
                        questionNum++;
                        choicesEl.textContent = "";
                        sfxWrong.play();
                        secs = secs - 15;
                    //If the question number is less than 5, then the function is executed again
                    if (questionNum < 5) {
                        question(questionNum);
                    //Otherwise, the timer gets scored as the score
                    } else {
                        questionsEl.textContent = "";
                        localStorage.setItem("highscore", secs);
                        isFinished();
                        highscores();
                    }
                }
            }
        }) 
    }
}

//This function always returns true and is used for the timer to stop counting when the game finishes
function isFinished() {
    return true;
}

//Function to show the end screen, clear the timer, get the highscore from local storage and display it
function highscores() {
    endScreenEl.setAttribute("class", "visible");
    timeEl.textContent = "";
    var score = localStorage.getItem("highscore");
    finalScoreEl.textContent = score;
    //Button used to get to the high scores screen
    submitButtonEl.addEventListener("click", highScoresDisplay) 
}

//Function that displays the high scores. If the user does not enter initials it alerts them to do so
function highScoresDisplay() {
    if (userInitialsEl.value === "") {
        alert("Please input initials");
        highScoresDisplay();
    } else {
        localStorage.setItem("initials", userInitialsEl.value);
        window.location.replace("highscores.html");
    }
}

//Timer function
function timer() {
    var timerInterval = setInterval(function() {
        secs--;
        timeEl.textContent = "Time: " + secs;

        if(secs === 0 || isFinished()) {
            clearInterval(timerInterval);
        }
    }, 1000);

};

