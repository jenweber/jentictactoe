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

//establish game board
var board = [['X', '', ''], ['O', '', ''], ['', '', '']];

//establish turn counter
var turnCounter = 0;

//CHANGE VAR TO CONST
var clearBoard = function() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
};

//Each session keeps a running turnCounter. If it's even, it's x's turn, and if odd, O's turn. This means that turns will always alternate, regardless of win/lose/draw since the board has an odd number of squares. CHANGE VAR TO CONST
var whoseTurn = function() {
    return turnCounter%2 === 0 ? "X" : "O";
};

var makeMove = function(row,column) {
    board[row][column] = whoseTurn();
    turnCounter+=1;
};
