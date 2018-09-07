//global array for the words to guess
var wordArr = ["jabbawockeez", "kinjaz", "les-twins", "strawhatz", "quest-crew",];

//global variables
var wins = 0;
var wrongLetter = [];
var guessLeft = 10;
var userGuesses = "";
var underScores = [];
var randWord;
var charCounter = 0;

//funtion for the game to start
function start(){

    //gets a random word from the wordArr array and put it inside randWord
    randWord = wordArr[Math.floor(Math.random() * wordArr.length)];
    console.log("Random word = " + randWord);
    
    //based on how many letters the randWord has, it pushes _ to the underScores array
    for(var i = 0; i < randWord.length; i++){
        underScores.push("_");
    }
    
    //calls the element to show it on the webpage, and used .join to get rid of the commas
    document.getElementById("under-scores").textContent = underScores.join(" ");

    //calls the element to post the initial number of guesses left
    document.getElementById("guesses-remaining").textContent = "Guesses remaining: " + guessLeft;

    

}

//function that resets the the underscores, guessed letters etc
function reset(){
    underScores = []; //set's it back to an empty array
    wrongLetter = []; //set's it back to an empty array
    document.getElementById("user-guessed-letters").textContent =  wrongLetter; //sets the element to show 10 again
    guessLeft = 10; //resets the guessLeft back to 10
    charCounter = 0; //resets the charCounter back to 0
}


//function that runs when the user guessed the word right
function winConditions(){
    if(charCounter === randWord.length){
        wins++; //adds 1 to wins
        document.getElementById("user-wins").textContent = "Wins: " + wins; // prints it to the element
        reset(); //calls the funtion reset to clear out the the underscores, wront letters etc
        start(); //calls the function to start the game again
    }
}


//function that has event listener
document.onkeyup = function(event){

    userGuesses = event.key; //sets the userGuess to whichever key the user press
    
    //checks to see if the userGuess matches any of the letter to the string inside randWord
    if(randWord.indexOf(userGuesses) > -1 && underScores.indexOf(userGuesses) === -1){
        for(i = 0; i < randWord.length; i++){
            if(randWord[i] === userGuesses){
                underScores[i] = userGuesses;
                document.getElementById("under-scores").textContent = underScores.join(" "); //prints the letter the user guessed in the underscore if the letter is correct
                charCounter++; //counts the number of letters the user guessed correctly
                winConditions(); //calls for winConditions function
            }
        }
    }
    else{
        wrongLetter.push(userGuesses); //pushes the userGuesses letter to wrongLetter array if it is not correct
        guessLeft--; //decrement the guessLeft
        
        document.getElementById("guesses-remaining").textContent = "Guesses remaining: " + guessLeft; //prints the new number of guesses left
        
        document.getElementById("user-guessed-letters").textContent = wrongLetter; //prints the wrong letters guessed by the user
    }

    if(guessLeft === 0){
        alert("GAME OVER"); //alerts the user that he lost
        wins = 0; //resets wins back to 0
        document.getElementById("user-wins").textContent = "Wins: " + wins; //prints the current number of wins
        reset(); //calls reset
        start(); //starts new game
        

    }
}


start(); //calls the start funtion
