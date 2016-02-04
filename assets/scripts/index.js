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

//establish initial virtual board, a 3x3 grid
var boardArray = ['', '', '', '', '', '', '', '', ''];

// reference to determine index of the tic tac toe button clicked
var translatedArray = ["a1", "b1", "c1", "a2", "b2", "c2", "a3", "b3", "c3"];

//establish turn counter
var turnCounter = 0;

// gameStatus will toggle between active and inactive. Game becomes inactive upon a win/loss, becomes active again after player clicks new campaign
var gameStatus = "active";

//initialize wins and losses counter for each player
var playerX = {wins: 0,
  losses: 0,
};
var playerO = {wins: 0,
  losses: 0,
};

const myApp = {
  baseUrl: 'http://tic-tac-toe.wdibos.com/',
};

//clear the web page board and virtual board for a new round. $square refers to ALL squares.
var clearBoard = function() {
    $(".square").text("");
    boardArray = ['', '', '', '', '', '', '', '', ''];
};

//create an account
const createServerGame = function() {
    $.ajax({
      url: myApp.baseUrl + '/games/',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      data:
      {}
    }).done(function(data) {
      console.log(data);
      console.log("server game created");
      myApp.game = data.game;
    }).fail(function(jqxhr) {
      console.error(jqxhr);
      console.log("server game creation failed");
    });
  };

//initialize the Server Game upon refresh or first visit
//  createServerGame();

//when the New Campaign button is clicked, the virtual and web page boards clear, status reset to active
$("#new-campaign").on("click", function() {
  clearBoard();
  gameStatus = "active";
  $('#bernie-win').hide();
  $('#hillary-win').hide();
  $('#trump-draw').hide();
  createServerGame();
});

// Each session keeps a running turnCounter. If it's even, it's x's turn, and if odd, O's turn. This means that turns will always alternate, regardless of win/lose/draw since the board has an odd number of squares. CHANGE VAR TO CONST
var whoseTurn = function() {
  return turnCounter%2 === 0 ? "X" : "O";
};

// Returns whoever went last. Used in ajax gameState fn
var lastTurn = function() {
  return turnCounter%2 === 0 ? "O" : "X";
};

//defines what happens once winning conditions are met. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
var afterWin = function() {
  gameStatus = "inactive";
  console.log(whoseTurn() + " is the winner!");
  if (whoseTurn() === "X") {
    playerX.wins+=1;
    playerO.losses+=1;
    $('.player-x-score').text(playerX.wins);
    $('#hillary-win').show();
  } else {
    playerO.wins+=1;
    playerX.losses+=1;
    $('.player-o-score').text(playerX.wins);
    $('#bernie-win').show();
  }
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
    $('#trump-draw').show();
  }
};


// fades profile pics to show whose turn it is
var turnAnimation = function() {
  if (whoseTurn() === 'O') {
    $("#hillary-profile").fadeTo( "slow" , 0.5);
    $("#bernie-profile").fadeTo( "slow" , 1);
  } else {
    $("#hillary-profile").fadeTo( "slow" , 1);
    $("#bernie-profile").fadeTo( "slow" , 0.5);
  }
};

// applies initial fade when the page is first loaded
turnAnimation();

// applies initial hide of winner images
$('#hillary-win').hide();
$('#bernie-win').hide();
$('#trump-draw').hide();

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
  turnAnimation();
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


// update server with each move
var saveState = function(index) {
  let isActive;
  if (gameStatus === "inactive") {
    isActive = true;
  } else {
    isActive = false;
  }
  console.log("trying to update server with move");
  $.ajax({
    url: myApp.baseUrl + '/games/' + myApp.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": index,
          "value": lastTurn(),
        },
        "over": isActive
      }
    }
  })
  .done(function(data) {
    console.log('turn submitted');
    myApp.game = data.game;
  }).fail(function(jqxhr) {
    console.error(jqxhr);
    console.log("update to server failed");
  });
};

// When a square is clicked, its index position is located on the virtual array
// If it is a valid move, the move is saved to the virtual array
// If the move was x, apply one image. If the move was O, apply the other image.
// Then the game checks for a winner, and adds one to the plus counter
// Need to add effect to virtual array and html
$(".square").on("click", function() {
  var index = translateArray($(this).attr('id'));
  if (validMove(boardArray[index]) === true) {
    $(this).text(whoseTurn());
    boardArray[index] = whoseTurn();
    if (whoseTurn() === 'X') {
      $(this).empty().append('<img src="/assets/images/hillary-logo.jpg" height="100px" width="100px">');
    }
    if (whoseTurn() === 'O') {
      $(this).empty().append('<img src="/assets/images/bernie-logo.jpg" height="100px" width="100px">');
    }
    gameResult();
    saveState(index);
  }
});

$(document).ready(() => {
//create an account
  $('#sign-up').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      createServerGame();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });

  });
// sign in
  $('#sign-in').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      console.log(data);
      createServerGame();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });

  });
//change pw
  $('#change-password').on('submit', function(e) {
    e.preventDefault();
    console.log("begin change password");
    if (!myApp.user) {
      console.error('wrong');
    }
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/change-password/' + myApp.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log('successfully changed password');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
//sign out - not yet working
  $('#sign-out').on('submit', function(e) {
    e.preventDefault();
    if (!myApp.user) {
      console.error('wrong');
    }
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log('signed out');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

});
