'use strict';

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

$(document).ready(() => {
  console.log('JavaScript is running');
});

//establish initial virtual tic tac toe board, representing a 3x3 grid
let boardArray = ['', '', '', '', '', '', '', '', ''];

// array made of the html ids of each box on the grid. Will be used to determine the index of each move.
let translatedArray = ["a1", "b1", "c1", "a2", "b2", "c2", "a3", "b3", "c3"];

//establish turn counter
let turnCounter = 0;

// gameStatus will toggle between active and inactive. Game becomes inactive upon a win/loss/draw, and becomes active again after player clicks new campaign
let gameStatus = "active";

// initialize wins and losses counter for each player, to be used on the scoreboard
let playerX = {wins: 0,
  losses: 0,
};
let playerO = {wins: 0,
  losses: 0,
};

// This is the url of the server, used in AJAX requests
const myApp = {
  baseUrl: 'http://tic-tac-toe.wdibos.com/',
};

// clear the web page board and virtual board for a new round. $square refers to ALL squares.
let clearBoard = function() {
    $(".square").text("");
    boardArray = ['', '', '', '', '', '', '', '', ''];
};

//using the form under Options, the user may create an account on the server
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


//when the New Campaign button is clicked, the virtual and web page boards clear, status reset to active
$("#new-campaign").on("click", function() {
  clearBoard();
  gameStatus = "active";
  $('#bernie-win').hide();
  $('#hillary-win').hide();
  $('#trump-draw').hide();
  createServerGame();
});

// Each session keeps a running turnCounter. If it's even, it's x's turn, and if odd, O's turn. This means that turns will always alternate, regardless of win/lose/draw since the board has an odd number of squares. CHANGE let TO CONST
let whoseTurn = function() {
  return turnCounter%2 === 0 ? "X" : "O";
};

// Returns whoever went last. Used in ajax gameState function, as opposed to whoseTurn which says whoever's turn it currently is
let lastTurn = function() {
  return turnCounter%2 === 0 ? "O" : "X";
};

//a chain of events happen after winning conditions are met, changing the visuals, the score, and the gameStatus. REPLACE CONSOLE LOG WITH WINNER DISPLAY IN HTML
let afterWin = function() {
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
let rowWin = function(currentBoard){
  for (let i = 0; i < 9; i+=3) {
      if (((currentBoard[i] === currentBoard[i+1]) && (currentBoard[i] === currentBoard[i+2])) && currentBoard[i] !== '') {
        afterWin();
      }
  }
};

//check to see if there are 3 in a column. Runs after every makeMove.
let columnWin = function(currentBoard){
  for (let i = 0; i < 3; i+=1) {
    if (((currentBoard[i] === currentBoard[i+3]) && (currentBoard[i] === currentBoard[i+6])) && currentBoard[i] !== '') {
      afterWin();
    }
  }
};

//check for diagonal wins. Runs after every makeMove.
let diagonalWin = function(currentBoard) {
  if ((currentBoard[2] === currentBoard[4]) && (currentBoard[2] === currentBoard[6]) && (currentBoard[4] !== '')) {
        afterWin();
    } else if ((currentBoard[0] === currentBoard[4]) && (currentBoard[0] === currentBoard[8]) && (currentBoard[4] !== '')) {
      afterWin();
    }
};

//checks to see if all spaces on the board have a value. Ends the game if they do.
let draw = function(currentBoard) {
  let isDraw = true;
  for (let i = 0; i < 9; i++) {
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
let turnAnimation = function() {
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
let gameResult = function () {
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

let translateArray = function(squareClicked) {
  return translatedArray.indexOf(squareClicked);
};

//  check to see if a move has already been made in this square. Prevents overwriting previous moves
let validMove = function(moveAttempt) {
  if ((moveAttempt !== "O") && (moveAttempt !== "X") && (gameStatus === "active")) {
    return true;
  } else {
    return false;
  }
};


// update server with each move
const saveState = function(index) {
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
// After every move, the game checks for a winner, and adds one to the plus counter
// After every move, the game is sent to the server as well
$(".square").on("click", function() {
  const index = translateArray($(this).attr('id'));
  if (validMove(boardArray[index]) === true) {
    $(this).text(whoseTurn());
    boardArray[index] = whoseTurn();
    if (whoseTurn() === 'X') {
      $(this).empty().append('<img src="https://raw.githubusercontent.com/jenweber/jentictactoe/gh-pages/assets/images/hillary-logo.jpg" height="100px" width="100px">');
    }
    if (whoseTurn() === 'O') {
      $(this).empty().append('<img src="https://github.com/jenweber/jentictactoe/blob/gh-pages/assets/images/bernie-logo.jpg?raw=true" height="100px" width="100px">');
    }
    gameResult();
    saveState(index);
  }
});

$(document).ready(() => {
//create an account
  $('#sign-up').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + 'sign-up/',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      myApp.user = data.user;
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });

  });
// sign in
  $('#sign-in').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
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
    let formData = new FormData(e.target);
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
    let formData = new FormData(e.target);
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
//View game history 
  $('#view-history').on('submit', function(e) {
    e.preventDefault();
    if (!myApp.user) {
      console.error('wrong');
    }
    $.ajax({
      url: myApp.baseUrl + 'games/',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
    }).done(function(data) {
      console.log(data);
      console.log('history printed');
      $('.history-goes-here').text(JSON.stringify(data));
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

});
