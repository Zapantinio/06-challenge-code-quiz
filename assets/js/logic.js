timeEl = document.querySelector(".timer");
buttonEl = document.querySelector("#start");
startEl = document.querySelector("#start-screen");
wrapperEl = document.querySelector(".wrapper");
h2El = document.querySelector("#question-title");
questionsEl = document.querySelector("#questions");
choicesEl = document.querySelector("#choices");

var secs = 100;
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
var questionNum = 0;


//Start quiz when clicking button
buttonEl.addEventListener("click", function(event) {
    if (event.target.matches("button") === true) {
        var buttonClicked = event.target;

        //Makes the content of the wrapper equal to nothing
        startEl.textContent = "";

        timer();
        question(questionNum);
    }

})

//Function that creates an h2 tag which includes the title for the question

function question(questionNum) {

    questionsEl.setAttribute("class", "visible");
    h2El.textContent = window.questions[questionNum].title

    //Creates an ordered list which is appended to the wrapper
    var ol = document.createElement("ol");
    choicesEl.appendChild(ol);
    //Loop to create a list of buttons each one having the answers to the question
    for (i = 0; i < window.questions[i].choices.length; i++) {
        var li = document.createElement("li");
        ol.appendChild(li);

        var button = document.createElement("button");
        button.dataset.index = i;
        li.appendChild(button);
        button.textContent = window.questions[questionNum].choices[i];  
        button.value = window.questions[questionNum].choices[i];

        button.addEventListener("click", function(event) {
            if (event.target.matches("button") === true) {
                var correctAnswer = window.questions[questionNum].answer;
                var buttonClicked = event.target.value;

                if (buttonClicked === correctAnswer) {
                        questionNum++;
                        choicesEl.textContent = "";
                        sfxRight.play();
                    if (questionNum < 5) {
                        question(questionNum);
                    } else {
                        questionsEl.textContent = "";
                    }
                } else {
                        questionNum++;
                        choicesEl.textContent = "";
                        sfxWrong.play();
                        secs = secs - 15;
                    if (questionNum < 5) {
                        question(questionNum);
                    } else {
                        questionsEl.textContent = "";
                    }
                }
            }
        }) 
    }
}

function highscores() {
    
}

function timer() {
    var timerInterval = setInterval(function() {
        secs--;
        timeEl.textContent = "Time: " + secs;

        if(secs === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

};

