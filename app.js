
//GLOBAL VARIABLES//
 
var playerScores = [0, 0];
var placeX = 'X';
var placeCircle = 'O';
var playerTwoTurn = false;
var winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//DOM OBJECTS//

var boxElements = document.querySelectorAll('[data-box]');
var newGameButton = document.querySelector('#newGameButton');
var winningMessageText = document.querySelector('[data-win-message-text]');
var winPage = document.querySelector('.winPage');
var restartCounter = document.querySelector('#restartCounter');
var playerOneCount = document.querySelector('.player-one-count');
var playerTwoCount = document.querySelector('.player-two-count');


//FUNCTIONS//

//Function for when scoreboard is clicked
var handleClick = function(event) {
    
    //Target the box that was clicked
    var box = event.target;

    //If statement to work out who's turn it is
    if (playerTwoTurn) {
        var currentMarker = placeCircle;
        box.style.color = 'blue';
    } else {
        var currentMarker = placeX;
        box.style.color = 'red';
        currentMarker.fontcolor = 'red';
    };

    //Call our placemarker function
    placeMarker(box, currentMarker);

    //Switch player turns
    changePlayer();

    //Update gameArray of markers placed on the board
    gameArray();

    //Check for Win
    if (isGameWon(currentMarker)) {
        endGame(false);
    } else if (isDraw(true)) {
        endGame(true);
    }
}

var endGame = function(draw) {

    if (draw) {
        winningMessageText.style.color = 'white';
        winningMessageText.innerText = 'It\'s a draw! Play again..';
    } else {
        if (!playerTwoTurn) {
        winningMessageText.style.color = 'blue';
        winningMessageText.innerText = 'O\'s win! Excellent...';
        } else {
        winningMessageText.style.color = 'red';
        winningMessageText.innerText = 'X\'s win! Great Job...';
        }
        updateScore();
    }
    winPage.classList.add('show');
}

//Function to work out if the game is a draw
var isDraw = function() {
    var boxArray2 = gameArray();
    if (boxArray2.includes('')) {
        return false;
    } else {
        return true;
    };
}
    
//Function to place marker on the board by changing object text content
var placeMarker = function(box, currentMarker) {
    box.textContent = currentMarker;
}

//Function to restart the game on event of draw/win/lose
var startNewGame = function() {

    //Remove the win class to reset the game
    winPage.classList.remove('show');

    //Remove all current markers on the board
    boxElements.forEach(function(box) {
        box.textContent = ''
    });

    //Remove the eventListener on the handleclick 
    boxElements.forEach(function(element) {
        element.removeEventListener('click', handleClick);
    });

    //Add the eventListener back on the handleclick
    boxElements.forEach(function(element) {
        element.addEventListener('click', handleClick, { once:true });
    });
}

//Function to swap player one to player two
var changePlayer = function() {
    playerTwoTurn = !playerTwoTurn;
}

//Function to check if game is won

var gameArray = function() {

    boxArray = [];
    boxElements.forEach(function(index) {
        boxArray.push(index.innerText);
    });
    return boxArray;
}

var restartGame = function() {

    //Reset the game
    startNewGame();

    //Reset player win counts to 0 for both players
    playerOneCount.textContent = '0';
    playerTwoCount.textContent = '0';

    playerScores = [0,0];
}

var updateScore = function() {

    if (!playerTwoTurn) {
        playerScores[1] = playerScores[1] + 1;
        playerTwoCount.textContent = playerScores[1];
    } else {
        playerScores[0] = playerScores[0] + 1;
        playerOneCount.textContent = playerScores[0];
    };
}

var isGameWon = function(currentMarker) {
    
    if (boxArray[0] === currentMarker && boxArray[1] === currentMarker && boxArray[2] === currentMarker) {
        return true;
    } else if (boxArray[3] === currentMarker && boxArray[4] === currentMarker && boxArray[5] === currentMarker)  {
        return true;
    } else if (boxArray[6] === currentMarker && boxArray[7] === currentMarker && boxArray[8] === currentMarker)  {
        return true;
    } else if (boxArray[0] === currentMarker && boxArray[3] === currentMarker && boxArray[6] === currentMarker)  {
        return true;
    } else if (boxArray[1] === currentMarker && boxArray[4] === currentMarker && boxArray[7] === currentMarker)  {
        return true;
    } else if (boxArray[2] === currentMarker && boxArray[5] === currentMarker && boxArray[8] === currentMarker)  {
        return true;
    } else if (boxArray[0] === currentMarker && boxArray[4] === currentMarker && boxArray[8] === currentMarker)  {
        return true;
    } else if (boxArray[2] === currentMarker && boxArray[4] === currentMarker && boxArray[6] === currentMarker)  {
        return true;
    } 
 }

//EVENTS//

boxElements.forEach(function(element) {
    element.addEventListener('click', handleClick, { once:true });
});
newGameButton.addEventListener('click', startNewGame);
restartCounter.addEventListener('click', restartGame);