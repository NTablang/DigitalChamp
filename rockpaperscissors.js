// scores[0] USER - scores[1] COMPUTER
let scores = [0,0] 
// index that will place an element at the most possible top layer
const TOPZINDEX = 15;

// increments the user's score by one
function givePointsToUser() {
    scores[0]++;
    let userScore = document.getElementById('yourscore');
    userScore.innerHTML = scores[0];
    return "You win!";

}

// increments the computer's point by one
function givePointsToComputer() {
    scores[1]++;
    let compScore = document.getElementById('compscore');
    compScore.innerHTML = scores[1];
    return "You lose!";
}

// gives a random response from the computer
function computerPlay() {
    const responses = ["rock", "paper", "scissors"];
    const randomNum = Math.floor(Math.random() * 3);
    return responses[randomNum];
}

// determines whether the user or the computer wins
function determineResult(playerSelection, computerSelection) {
    let result;
    switch (playerSelection) {
        case "rock":
            if (computerSelection === "rock") {
                result = "Tie!";
            }
            else if (computerSelection == "paper") {
                result = givePointsToComputer();
                //return "You lose! Paper beats rock!";
            }
            else {
                result = givePointsToUser();
                //return "You win! Rock beats scissors!";
            }
            break;
        case "paper":
            if (computerSelection === "paper") {
                result = "Tie!";
            }
            else if (computerSelection == "scissors") {
                result = givePointsToComputer();
                //return "You lose! Scissors beats paper!";
            }
            else {
                result = givePointsToUser();
                //return "You win! Paper beats Rock!";
            }
            break;
        case "scissors":
            if (computerSelection === "scissors") {
                result = "Tie!";
            }
            else if (computerSelection == "rock") {
                result = givePointsToComputer();
                //return "You lose! Rock beats scissors!";
            }
            else {
                result = givePointsToUser();
                //return "You win! Scissors beats paper!";
            }
            break;
    }
    return result;
}

// plays a round by determining result and showing an appropriate scene
function playRound(playerSelection, computerSelection) {
    let userScore = document.getElementById('yourscore');
    let compScore = document.getElementById('compscore');

    userScore.innerHTML = scores[0];
    compScore.innerHTML = scores[1];
    
    // SCORES BEST OF FIVE
    if (scores[0] < 5 && scores[1] < 5) {
        let result = determineResult(playerSelection, computerSelection);

        // if user wins, show the win video scenes
        if (result.includes("win")) {
            showWinDialog(playerSelection, computerSelection);
            setTimeout(changeToPunchScene, 2000);
        }
        // if user loses, show the lose video scenes
        else if(result.includes("lose")) {
           showLoseDialog(playerSelection, computerSelection);
           setTimeout(changeToPunchedScene, 2000);
        }
        // if there's a tie, show the tie dialog
        else {
            showTieDialog(playerSelection, computerSelection);
            setTimeout(changeSceneBack, 1500);
        }

        // if the user gets to score 5 first
        if (scores[0] == 5) {
            showWinDialog(playerSelection, computerSelection);
           setTimeout(changeToWonScene, 2000);
        }
        // if the computer gets to score 5 first
        else if (scores[1] == 5) {
            showLoseDialog(playerSelection, computerSelection);
            setTimeout(sendToLosePage, 2000);
        }
    }
}

// SCENES

// show the win dialog
function showWinDialog(playerSelection, computerSelection) {
    let resultsBox = document.getElementById('results-box');

    // put to top
    resultsBox.style.zIndex = TOPZINDEX; 
    resultsBox.style.color = "green";
    resultsBox.innerHTML = "win";
    resultsBox.style.fontSize = "50px";

    // print results
    resultsBox.innerHTML = `WIN: ${playerSelection} beats ${computerSelection}!`;
}

// show the lose dialog
function showLoseDialog(playerSelection, computerSelection) {
    let resultsBox = document.getElementById('results-box');

    // put to top
    resultsBox.style.zIndex = TOPZINDEX; 
    resultsBox.style.color = "red";
    resultsBox.style.fontSize = "50px";

    // print results
    resultsBox.innerHTML = `LOSE: ${computerSelection} beats ${playerSelection}!`;

}

// show the tie dialog
function showTieDialog(playerSelection, computerSelection) {
    let resultsBox = document.getElementById('results-box');

    // put to top
    resultsBox.style.zIndex = TOPZINDEX; 
    resultsBox.style.color = "black";
    resultsBox.style.fontSize = "50px";

    // print results
    resultsBox.innerHTML = `TIE: ${computerSelection} is ${playerSelection}!`;
}

//  punching the computer scene
function changeToPunchScene() {
    // put results box back into bottom
    let resultsBox = document.getElementById('results-box');
    resultsBox.style.zIndex = -1;

    // put the punched computer on top
    let punchTheCompScene = document.getElementById('punch-background');
    punchTheCompScene.style.zIndex = TOPZINDEX;

    // put things back into normal
    setTimeout(changeSceneBack, 1500);
}

// being punched by the computer scene
function changeToPunchedScene() {
    // put results box back into bottom
    let resultsBox = document.getElementById('results-box');
    resultsBox.style.zIndex = -1;

    // put the punched computer on top
    let punchedByCompScene = document.getElementById('punched-background');
    punchedByCompScene.style.zIndex = TOPZINDEX;

    // put things back into normal
    setTimeout(changeSceneBack, 1000);
}

// changes scenes back to its normal layer (z-index) ordering
function changeSceneBack() {
    // get element ids
    let punchTheCompScene = document.getElementById('punch-background');
    let punchedByCompScene = document.getElementById('punched-background');
    let resultsBox = document.getElementById('results-box');
    let choices = document.getElementById('choices');

    // restore to normal position
    resultsBox.style.zIndex = -1;
    punchTheCompScene.style.zIndex = 3;
    punchedByCompScene.style.zIndex = 2;
    choices.style.zIndex = TOPZINDEX;
    resultsBox.style.zIndex = -1;
}

function changeToWonScene() {
    changeSceneBack();
    let wonScene = document.getElementById('won-background');
    wonScene.style.zIndex = 30;
    setTimeout(sendToWinPage, 4000);
}


function sendToLosePage() {
    location="lost.html";
}
function sendToWinPage() {
    location="win.html";
}

