'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

$(document).ready(() => {
  console.log('JS script is running');
});
console.log('functions are available');

//turn current game board into a simple array
var getBoard = function () {
  return [[$("#a1").text(), $("#b1").text(), $("#c1").text()],
  [$("#a2").text(), $("#b2").text(), $("#c2").text()],
  [$("#a3").text(), $("#b3").text(), $("#c3").text()]];
};
//establish initial board
var boardArray = getBoard();

//establish turn counter
var turnCounter = 0;

// gameStatus will toggle between active and inactive. Game becomes inactive upon a win/loss
var gameStatus = "active";

//clear the game board for a new round. $square refers to ALL squares
var clearBoard = function() {
    $(".square").text("");
};

//start wins and losses counter for each player
var playerX = {wins: 0,
  losses: 0,
};
var playerO = {wins: 0,
  losses: 0,
};
//calls clear the board - remove after testing
clearBoard();

//when the New Campaign button is clicked, the board clears
$("#newCampaign").on("click", function() {clearBoard();});

//Each session keeps a running turnCounter. If it's even, it's x's turn, and if odd, O's turn. This means that turns will always alternate, regardless of win/lose/draw since the board has an odd number of squares. CHANGE VAR TO CONST
var whoseTurn = function() {
    return turnCounter%2 === 0 ? "X" : "O";
};

//defines what happens once winning conditions are met
var afterWin = function() {
  gameStatus = "inactive";
  console.log(whoseTurn() + " is the winner!");
  if (whoseTurn() === "X") {
    playerX.wins+=1;
    playerO.losses+=1;
  } else {
    playerO.wins+=1;
    playerX.losses+=1;
  }
  console.log(playerX);
  console.log(playerO);
};

//checks to see if there are 3 in a row. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
var rowWin = function(currentBoard){

    var column = 0;
    for (var row = 0; row < 3; row++) {
        if (((currentBoard[row][column] === currentBoard[row][column+1]) && (currentBoard[row][column+1] === currentBoard[row][column+2])) && currentBoard[row][column] !== '') {
          afterWin();
        }
    }
};

//check to see if there are 3 in a column. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
var columnWin = function(currentBoard){
    var row = 0;
    for (var column = 0; column < 3; column++) {
        if (((currentBoard[row][column] === currentBoard[row+1][column]) && (currentBoard[row+1][column] === currentBoard[row+2][column])) && currentBoard[row][column] !== '') {
            afterWin();
        }
    }
};

//check for diagonal wins. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
var diagonalWin = function(currentBoard) {
    var row = 0;
    var column = 0;
    if (((currentBoard[row][column] === currentBoard[row+1][column+1]) && (currentBoard[row+1][column+1] === currentBoard[row+2][column+2])) && currentBoard[row+1][column+1] !== '') {
            afterWin();
        } else if (((currentBoard[row][column+2] === currentBoard[row+1][column+1]) && (currentBoard[row+1][column+1] === currentBoard[row+2][column])) && currentBoard[row+1][column+1] !== '') {
          afterWin();
        }
};

var draw = function(currentBoard) {
  var isDraw = true;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (currentBoard[i][j] === "") {
        isDraw = false;
      }
    }
  }
  if (isDraw === true) {
    gameStatus = "inactive";
    console.log("the game is a draw");
  }
};

//gameResult updates boardArray with the current game status, then checks to see if any conditions exist which would end the game. The turn counter is advanced by 1 so that it becomes the other person's turn. If statements prevent a win in two directions from registering twice
var gameResult = function () {
  var boardArray = getBoard();
    rowWin(boardArray);
    if (gameStatus === "active") {
      columnWin(boardArray);
    }
    if (gameStatus === "active") {
      diagonalWin(boardArray);
    }
    if (gameStatus === "active") {
      draw(boardArray);
    }
    turnCounter +=1;
};



// check to see if a move has already been made in this square
var validMove = function(moveAttempt) {
  if ((moveAttempt !== "O") && (moveAttempt !== "X") && (gameStatus === "active")) {
    return true;
  } else {
    return false;
  }
};

// basic function to change the value of a square
$(".square").on("click", function() {
  if (validMove($(this).text()) === true) {
    $(this).text(whoseTurn());
    gameResult();
  }
});


//Need to add some change to the html that will show whose turn it is.
//Need to add win/loss/draw counter
//Need to add new game functionality
