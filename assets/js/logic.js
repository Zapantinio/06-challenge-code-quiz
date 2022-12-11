//adding timer
timeEl = document.querySelector(".timer");
buttonEl = document.querySelector("#start");
startEl = document.querySelector(".start");
wrapperEl = document.querySelector(".wrapper");

//Start quiz when clicking button
buttonEl.addEventListener("click", function(event) {
    if (event.target.matches("button") === true) {
        var buttonClicked = event.target;

        //Makes the content of the wrapper equal to nothing
        wrapperEl.textContent = "";

        //Creates an h2 tag which includes the title for the question
        var h2 = document.createElement("h2");
        wrapperEl.appendChild(h2);
        h2.textContent = window.questions[0].title;

        //Creates an ordered list which is appended to the wrapper
        var ol = document.createElement("ol");
        wrapperEl.appendChild(ol);

        //Loop to create a list of buttons each one having the answers to the question
        for (i = 0; i < window.questions[i].choices.length; i++) {
            var li = document.createElement("li");
            ol.appendChild(li);

            var button = document.createElement("button");
            button.dataset.index = i;
            li.appendChild(button);
            button.textContent = window.questions[i].choices[i];
            
        }

        timer();


        // var ul = document.createElement("ul");
        // for (var i = 0; i < 4; i++) {
        //     var li = document.createElement("li");
        //     li.textContent = 
        // }

    }
    

})







var secs = 10;
function timer() {

    var timerInterval = setInterval(function() {
        secs--;
        timeEl.textContent = "Time: " + secs;
    }, 1000);

    if(secs === 0) {
        clearInterval(timerInterval);
    }
};

