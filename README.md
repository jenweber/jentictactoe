# GA WDI Project 1 - Tic Tac Toe
<a href="http://jenweber.github.io/jentictactoe/">Project link</a>

## My Goals
This game is my first deployed web app, created during week 3 of the General Assembly Web Development Bootcamp. Above and beyond having a working product, I wanted to offer a new experience to the user, since so many people are familiar with tic tac toe already. Although the political theme will quickly become outdated, the prospect of having something that I was proud of, that has a punchline, was such a motivator that I decided to keep that theme, and re-skin it later if needed.

##How It Works
This game makes use of JavaScript, HTML, jQuery, one Bootstrap component, Sass styling, JSON, and AJAX. It communicates with a preestablished Ruby on Rails server for sign up, sign in, sign out, change password, send game, and view history. The game's functionality hinges on the separation of the visual output from a virtual array. Meaning that, every time a user makes a valid move, the visual is updated, the game's virtual array is updated, and the server is updated. This separation would allow for new themes to be more easily applied in the future, since the JavaScript program does not need to read the game from the HTML.

The greatest hurdle and time sink was debugging AJAX server requests. Unlike JavaScript or CSS that I can throw into a Repl, I had to rely on making sense of the error messages. In most cases, a simple problem was to blame, such as a misplaced comma, or a mistaken "password" instead of "passwords."

Given more time, I would create a footer nav bar with bootstrap that handles the sign up/in/out/ect functions in separate modals. The user would see some visual signal that their submission went through. Also, a new user who just registered would receive a prompt to sign in. I would troubleshoot the loading flash that exposes hidden images, or find another way to add them without using .hide and .show. Lastly, I would add responsive styling.

Some things I did that aided my development process included doing a mockup of the visuals in a simple image editor program, and keeping a detailed to-do list for each step. As I was working, I would be tempted to switch my focus (such as from jQuery to some CSS detail), so the to-do list was a good place for me to keep those tasks for later.

## User Stories
-A user may optionally register a username and password, then sign in, in order to have their games sent to the server

-A user may log out at any time.

-A user, when viewing the game board, can click on a square, which will add their icon to the board and make it the other player’s turn.

-A usercan look to see whose turn it is, as indicated on the scoreboard.

-A user, after completing the game, can see a display of who won the round

-A user, after completing the game, can click new campaign, which will clear the board and change it to the other player’s turn first


##  Wireframes

Initial wireframes [A](https://drive.google.com/file/d/0BxL5EMSDOzzwVDEwOUpkUFpqMDlqYVJNSXhRZW15ajBXVS0w/view?usp=sharing) and [B](https://drive.google.com/file/d/0BxL5EMSDOzzwSkprX3NWQU11SUVSaWZrVU1qX0sxdjV3MjBj/view?usp=sharing)


## [License](LICENSE)

Source code distributed under the MIT license. Text and other assets copyright
General Assembly, Inc., all rights reserved.
