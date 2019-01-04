// global vars
// ------------------------------------------------------------
// arrays and vars to hold data

const wordOptions = ["garnet", "magician", "handtrap", "dinosaur", "trains", "skull", "buster", "rota", "search", "ojama", "cyber", "blueeyes"];
let selectedWord = "";
let lettersInWord = [];
let numBlanks = 0;
let blanksAndSuccesses = [];
let wrongLetters = [];

// counters
let winCounter = 0;
let lossCounter = 0;
let guessesLeft = 9;

// functions
// ------------------------------------------------------------

function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // populate blanks and successes with right num of blanks

    for (let i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    // change html to reflect game state

    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCounter;
    document.getElementById("lossCounter").innerHTML = lossCounter;



    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
    // check if letter exists in word
    let isLetterInWord = false

    for (let i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
            console.log("match!");

        }
        
    }

    // check where in thw word out letter exists and populate the blanksAndSuccessess array

    if (isLetterInWord) {
        for (let i = 0; i < numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
                document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
            }
        }
    } else {
        wrongLetters.push(letter);
        document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
        guessesLeft--
        document.getElementById("numGuesses").innerHTML = guessesLeft;
    }

    console.log(blanksAndSuccesses)

}

function roundComplete() {
    console.log("Win Count: " + winCounter + " | Loss Count: " + lossCounter + " | Guesses Left: " + guessesLeft);

    // if user won
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCounter++;
        document.getElementById("winCounter").innerHTML = winCounter;
        alert("You Win!");
        wrongLetters = [];
        document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
        startGame();
    }


    // if user lost
    if (guessesLeft === 0) {
        alert("You Lose!");
        wrongLetters = [];
        document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
        lossCounter++;
        document.getElementById("lossCounter").innerHTML = lossCounter;
        startGame();
    }
}


// main process
// ------------------------------------------------------------

// initiates first time code

startGame();

// register keyclicks

document.onkeyup = function(event) {
    let letterGuessed = String.fromCharCode(event.keyCode).toLocaleLowerCase();
    checkLetters(letterGuessed);
    console.log(letterGuessed);

    setTimeout(roundComplete, 1)
    // roundComplete();

}