/*Setting up game and variables*/
//Declare array of words for the Avatar Hangman Game and score information
var gameWords = ["sokka", "earthbending", "aang", "katara", "omashu", "zuko", "appa", "waterbending"];
var availableKeys = "abcdefghijklmnopqrstuvwxyz"; 
var wins = 0;
var losses = 0;

function setup() {
  //Randomly choose a word from the array to start each game
  var wordSelect = gameWords[Math.floor(Math.random() * gameWords.length)];

  //Declare global variables for the player guesses remaining
  var guessLeft = 10;

  //Declare array for user guesses and write to document
  var guessChoiceArr = [];
  document.getElementById("user-choice").innerHTML = guessChoiceArr;

  //Write current status of wins, losses, and guesses remaining
  document.getElementById("win").innerHTML = wins;
  document.getElementById("lose").innerHTML = losses;
  document.getElementById("remain").innerHTML = guessLeft;

  //Create blank spaces for the number of letters in the word and write to document
  var underscore = wordSelect.replace(/[a-z]/g, "_");
  document.getElementById("blanks").innerHTML = underscore;

  /*Game code start*/
  //Start guess by selecting any letter key
  document.onkeyup = function(event) {
    var select = event.key;

    //Function used to replace correct letter at its index
    function replaceIndex(string,index,replacement) {
        return string.substr(0, index) + replacement + string.substr(index+1);
    }

    //Checks that the user choice is a letter from a-z
    if (availableKeys.indexOf(select) > -1){
        //If letter is in the word, then show it
        if (wordSelect.includes(select)) {
          var letterInd = [];
          //Loop through each index of wordSelect length
          for (var i = 0; i < wordSelect.length; i++) {
            if(wordSelect[i] === select) letterInd.push(i);
          }
          //Loop through each index of letterInd
          for (var j = 0; j < letterInd.length; j++){
            underscore = replaceIndex(underscore, letterInd[j], select);
            var counter = letterInd.length;
          }               
        }
        //If user choice is not in the word, decrement guessLeft and push to array
        else if (guessChoiceArr.includes(select)===false && wordSelect.indexOf(select)===-1){
          guessChoiceArr.push(select);
          guessLeft--;      
        }
    //Increment wins if user guess the word and end the game
    if (underscore === wordSelect){
      wins++;
      setup();
      return;
    }
    //Increment losses if user has no more guesses remaining and end the game
    else if (guessLeft < 1) {
      losses++;
      setup();
      return;
    }
  }

  //Print updates to the document
  document.getElementById("blanks").innerHTML = underscore;
  document.getElementById("user-choice").innerHTML = guessChoiceArr;
  document.getElementById("win").innerHTML = wins;
  document.getElementById("lose").innerHTML = losses;
  document.getElementById("remain").innerHTML = guessLeft;

  }
}
window.onload = function(event){
  setup();
}