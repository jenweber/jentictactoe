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

//turn current game board into a simple array. Need to eliminate the use of this fn and create virtual array insteaad (boardArray)
// var getBoard = function () {
//   return [[$("#a1").text(), $("#b1").text(), $("#c1").text()],
//   [$("#a2").text(), $("#b2").text(), $("#c2").text()],
//   [$("#a3").text(), $("#b3").text(), $("#c3").text()]];
// };

//establish initial virtual board, a 3x3 grid
var boardArray = ['', '', '', '', '', '', '', '', ''];

// reference to determine index of the tic tac toe button clicked
var translatedArray = ["a1", "b1", "c1", "a2", "b2", "c2", "a3", "b3", "c3"];

//establish turn counter
var turnCounter = 0;

// gameStatus will toggle between active and inactive. Game becomes inactive upon a win/loss, becomes active again after player clicks new campaign
var gameStatus = "active";

//clear the web page board and virtual board for a new round. $square refers to ALL squares.
var clearBoard = function() {
    $(".square").text("");
    boardArray = ['', '', '', '', '', '', '', '', ''];
};

//initialize wins and losses counter for each player
var playerX = {wins: 0,
  losses: 0,
};
var playerO = {wins: 0,
  losses: 0,
};

//when the New Campaign button is clicked, the virtual and web page boards clear, status reset to active
$("#new-campaign").on("click", function() {
  clearBoard();
  gameStatus = "active";
});

//Each session keeps a running turnCounter. If it's even, it's x's turn, and if odd, O's turn. This means that turns will always alternate, regardless of win/lose/draw since the board has an odd number of squares. CHANGE VAR TO CONST
var whoseTurn = function() {
    return turnCounter%2 === 0 ? "X" : "O";
};

//defines what happens once winning conditions are met. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
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
  $("#scoreBoard").text(playerX.wins);
};

//checks to see if there are 3 matching in a row. Does not count blank spaces as a match. Runs after every makeMove.
var rowWin = function(currentBoard){
  for (var i = 0; i < 9; i+=3) {
      if (((currentBoard[i] === currentBoard[i+1]) && (currentBoard[i] === currentBoard[i+2])) && currentBoard[i] !== '') {
        afterWin();
      }
  }
};

//check to see if there are 3 in a column. Runs after every makeMove.
var columnWin = function(currentBoard){
  for (var i = 0; i < 3; i+=1) {
    if (((currentBoard[i] === currentBoard[i+3]) && (currentBoard[i] === currentBoard[i+6])) && currentBoard[i] !== '') {
      afterWin();
    }
  }
};

//check for diagonal wins. Runs after every makeMove.
var diagonalWin = function(currentBoard) {
  if ((currentBoard[2] === currentBoard[4]) && (currentBoard[2] === currentBoard[6]) && (currentBoard[4] !== '')) {
        afterWin();
    } else if ((currentBoard[0] === currentBoard[4]) && (currentBoard[0] === currentBoard[8]) && (currentBoard[4] !== '')) {
      afterWin();
    }
};

//checks to see if all spaces on the board have a value. Ends the game if they do.
var draw = function(currentBoard) {
  var isDraw = true;
  for (var i = 0; i < 9; i++) {
    if (currentBoard[i] === "") {
      isDraw = false;
    }
  }
  if (isDraw === true) {
    gameStatus = "inactive";
    console.log("the game is a draw");
  }
};

//gameResult updates boardArray with the current game status, then checks to see if any conditions exist which would end the game. The turn counter is advanced by 1 so that it becomes the other person's turn. If() statements prevent a win in two directions from registering twice
//need to eliminate the use of getBoard
var gameResult = function () {
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

var translateArray = function(squareClicked) {
  return translatedArray.indexOf(squareClicked);
};

// LEFT OFF HERE check to see if a move has already been made in this square. Prevents overwriting previous moves
var validMove = function(moveAttempt) {
  if ((moveAttempt !== "O") && (moveAttempt !== "X") && (gameStatus === "active")) {
    return true;
  } else {
    return false;
  }
};

// basic function to change the value of a square. Need to base logic on virtual array. Need to add effect to virtual array and html
$(".square").on("click", function() {
  var index = translateArray($(this).attr('id'));
  if (validMove(boardArray[index]) === true) {
    $(this).text(whoseTurn());
    boardArray[index] = whoseTurn();
    gameResult();
  }
});


//Need to add some change to the html that will show whose turn it is.
//Need to add win/loss/draw counter
