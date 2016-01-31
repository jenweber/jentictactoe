'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
require('./assets/scripts/index.js');
require('./assets/styles/index.scss');

//NOT SURE WHERE TO PUT CODE

// attach jQuery globally
require('expose?$!jquery');
require('expose?jQuery!jquery');

// WHAT CODE GOES IN THIS FILE??? Migrated to index.js in assets/scripts
//establish game board
var board = [['', '', ''], ['', '', ''], ['', '', '']];

//establish turn counter
var turnCounter = 0;

// //CHANGE VAR TO CONST
// var clearBoard = function() {
//     board = [['', '', ''], ['', '', ''], ['', '', '']];
// };
//
// //Each session keeps a running turnCounter. If it's even, it's x's turn, and if odd, O's turn. This means that turns will always alternate, regardless of win/lose/draw since the board has an odd number of squares. CHANGE VAR TO CONST
// var whoseTurn = function() {
//     return turnCounter%2 === 0 ? "X" : "O";
// };
// //how to connect this with the html gameboard?
// var makeMove = function(row,column) {
//     board[row][column] = whoseTurn();
//     checkForWinner();
// };
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
