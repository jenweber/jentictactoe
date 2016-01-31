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
console.log('here are my functions');

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

//clear the game board for a new round. $square refers to ALL squares
var clearBoard = function() {
    $(".square").text("");
};

//Each session keeps a running turnCounter. If it's even, it's x's turn, and if odd, O's turn. This means that turns will always alternate, regardless of win/lose/draw since the board has an odd number of squares. CHANGE VAR TO CONST
var whoseTurn = function() {
    return turnCounter%2 === 0 ? "X" : "O";
};

//checks to see if there are 3 in a row. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
var rowWin = function(currentBoard){

    var column = 0;
    for (var row = 0; row < 3; row++) {
        if (((currentBoard[row][column] === currentBoard[row][column+1]) && (currentBoard[row][column+1] === currentBoard[row][column+2])) && currentBoard[row][column] !== '') {
            return console.log(currentBoard[row][column] + ' is the winner!');
        }
    }
};
//check to see if there are 3 in a column. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
var columnWin = function(currentBoard){
    var row = 0;
    for (var column = 0; column < 3; column++) {
        if (((currentBoard[row][column] === currentBoard[row+1][column]) && (currentBoard[row+1][column] === currentBoard[row+2][column])) && currentBoard[row][column] !== '') {
            return console.log(currentBoard[row][column] + ' is the winner!');
        }
    }
};
//check for diagonal wins. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
var diagonalWin = function(currentBoard){
    var row = 0;
    var column = 0;
    if (((currentBoard[row][column] === currentBoard[row+1][column+1]) && (currentBoard[row+1][column+1] === currentBoard[row+2][column+2])) && currentBoard[row+1][column+1] !== '') {
            return console.log(currentBoard[row+1][column+1] + ' is the winner!');
        } else if (((currentBoard[row][column+2] === currentBoard[row+1][column+1]) && (currentBoard[row+1][column+1] === currentBoard[row+2][column])) && currentBoard[row+1][column+1] !== '') {
            return console.log(currentBoard[row+1][column+1] + ' is the winner!');
        }
};
//gameResult updates boardArray with the current game status, then checks to see if any conditions exist which would end the game. The turn counter is advanced by 1 so that it becomes the other person's turn
var gameResult = function () {
  var boardArray = getBoard();
    rowWin(boardArray);
    columnWin(boardArray);
    diagonalWin(boardArray);
    turnCounter +=1;
    console.log(boardArray);
};
// basic function to change the value of a square
$(".square").on("click", function() {
  $(this).text(whoseTurn());
  gameResult();
});

//NEED TO ADD preventing someone from changing a box that already has a value --- if statement in makeMove? Need to add checking for a draw. Need to add some change to the html that will show whose turn it is. Need to add win/loss/draw counter


//CODE BELOW is plain JS. Code above incorporates JQuery
//establish game board
// var board = [['', '', ''], ['', '', ''], ['', '', '']];
//
// //establish turn counter
// var turnCounter = 0;
//
// //CHANGE VAR TO CONST
// var clearBoard = function() {
//     board = [['', '', ''], ['', '', ''], ['', '', '']];
// };
//
// //Each session keeps a running turnCounter. If it's even, it's x's turn, and if odd, O's turn. This means that turns will always alternate, regardless of win/lose/draw since the board has an odd number of squares. CHANGE VAR TO CONST
// var whoseTurn = function() {
//     return turnCounter%2 === 0 ? "X" : "O";
// };
//
// //check to see if there are 3 in a row. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
// var rowWin = function(){
//     var column = 0;
//     for (var row = 0; row < 3; row++) {
//         if (((board[row][column] === board[row][column+1]) && (board[row][column+1] === board[row][column+2])) && board[row][column] !== '') {
//             return console.log(board[row][column] + ' is the winner!');
//         }
//     }
// };
// //check to see if there are 3 in a column. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
// var columnWin = function(){
//     var row = 0;
//     for (var column = 0; column < 3; column++) {
//         if (((board[row][column] === board[row+1][column]) && (board[row+1][column] === board[row+2][column])) && board[row][column] !== '') {
//             return console.log(board[row][column] + ' is the winner!');
//         }
//     }
// };
// //check for diagonal wins. Runs after every makeMove. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
// var diagonalWin = function(){
//     var row = 0;
//     var column = 0;
//     if (((board[row][column] === board[row+1][column+1]) && (board[row+1][column+1] === board[row+2][column+2])) && board[row+1][column+1] !== '') {
//             return console.log(board[row+1][column+1] + ' is the winner!');
//         } else if (((board[row][column+2] === board[row+1][column+1]) && (board[row+1][column+1] === board[row+2][column])) && board[row+1][column+1] !== '') {
//             return console.log(board[row+1][column+1] + ' is the winner!');
//         }
// };
// var checkForWinner = function () {
//     rowWin();
//     columnWin();
//     diagonalWin();
//     turnCounter +=1;
//     console.log(board);
// };
// //NEED TO ADD preventing someone from changing a box that already has a value --- if statement in makeMove?
// //how to connect this with the html gameboard?
// var makeMove = function(row,column) {
//     board[row][column] = whoseTurn();
//     checkForWinner();
// };
