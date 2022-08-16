const cellSet = Array.from(document.getElementsByClassName('cell')); //transalte the cells into an array that an be used elsewhere
//set up and assign some variables and ids
let winOrDraw = document.getElementById("winOrDraw");
let resetButton = document.getElementById("resetButton");
let turnNotifier = document.getElementById('turnNotifier');

const xPlayer = "X";
const oPlayer = "O";
let turnMarker;// = xPlayer;

//set all squares to blank (null) at start
const squares = []
// Array(cellSet.length);
// squares.fill(null);

const drawBoard = () => {
    cellSet.forEach ((cell, index) => {
        let styleString = '';
        if (index < 3) {
            styleString += 'border-bottom: 3px solid var(--color);';
        }
        if (index % 3 === 0) {
            styleString += 'border-right: 3px solid var(--color);';
        }
        if (index % 3 ===2) {
            styleString += 'border-left: 3px solid var(--color);';
        }
        if (index > 5) {
            styleString += 'border-top: 3px solid var(--color);';
        }
        cell.style = styleString;
        winOrDraw.innerText = ""
        cell.addEventListener('click', cellClicked);
    });
};
// empty cells have onclick that will enter X or O based on the turn
const cellClicked = (position) => {
    console.log("cell was clicked");
    let id = position.target.id;
    //check if a square is already empty, and if no assign the current player's letter there
    if(!squares[id]) {
        squares[id] = turnMarker;
        position.target.innerText = turnMarker;

        //check for a win before switching players. 
        //Only need to check current player, because 
        //other player won't win on current player's turn
        if (winningPlay()) {
            //turnNotifier.innerText = `${turnMarker} wins!`;
            winOrDraw.innerText = ` Player ${turnMarker} Wins!`;
            winOrDraw.style.opacity = "100";
            return;
        } 
        //checks for a win, and returns true if so. Even if board is full, check win first.     
        if (fullBoardDraw()) {
            winOrDraw.innerText = `It's a DRAW! No Winner!`;
            winOrDraw.style.opacity = "100";
            return;
        }   
        if (turnMarker === xPlayer) {
            turnMarker = oPlayer;
        } else if (turnMarker === oPlayer) {
            turnMarker = xPlayer;
        }
        turnNotifier.innerText = `Now playing: ${turnMarker}`;
    }
}

const winningPlay = () => {
    if (squares[0]=== turnMarker){
        if (squares[1] === turnMarker && squares[2] === turnMarker){
            console.log(`${turnMarker} wins!`);
            return true;
        }
    }
    if (squares[0]=== turnMarker){
        if (squares[4] === turnMarker && squares[8] === turnMarker){
            console.log(`${turnMarker} wins!`);
            return true;
        }
    }
    if (squares[0]=== turnMarker){
        if (squares[3] === turnMarker && squares[6] === turnMarker){
            console.log(`${turnMarker} wins!`);
            return true;
        }
    }
    if (squares[1]=== turnMarker){
        if (squares[4] === turnMarker && squares[7] === turnMarker){
            console.log(`${turnMarker} wins!`);
            return true;
        }
    }
    if (squares[2]=== turnMarker){
        if (squares[5] === turnMarker && squares[8] === turnMarker){
            console.log(`${turnMarker} wins!`);
            return true;
        }
    }
    if (squares[2]=== turnMarker){
        if (squares[4] === turnMarker && squares[6] === turnMarker){
            console.log(`${turnMarker} wins!`);
            return true;
        }
    }
    if (squares[3]=== turnMarker){
        if (squares[4] === turnMarker && squares[5] === turnMarker){
            console.log(`${turnMarker} wins!`);
            return true;
        }
    }
    if (squares[6]=== turnMarker){
        if (squares[7] === turnMarker && squares[8] === turnMarker){
            console.log(`${turnMarker} wins!`);
            return true;
        }
    }
}
//the draw was difficult. I couldn't figure out an easy way to iterate through the whole squares[array] without messing things up
//or causeing a weird issue where it would work fine after the first reset. So i manually put in each one. Also tried with '!== null'
//but it would throw up the draw alert on the first click even when I thought it should check that every space was !null 
const fullBoardDraw = () => {
    if (
    (squares[0] === xPlayer || squares[0] === oPlayer) && 
    (squares[1] === xPlayer || squares[1] === oPlayer) &&
    (squares[2] === xPlayer || squares[2] === oPlayer) && 
    (squares[3] === xPlayer || squares[3] === oPlayer) && 
    (squares[4] === xPlayer || squares[4] === oPlayer) && 
    (squares[5] === xPlayer || squares[5] === oPlayer) && 
    (squares[6] === xPlayer || squares[6] === oPlayer) && 
    (squares[7] === xPlayer || squares[7] === oPlayer) && 
    (squares[8] === xPlayer || squares[8] === oPlayer) ){ 
        return true;
    }
}

//if board fills, or player wins (3 in a row, orthogonal or diagonal) then send alert announcing winner/draw
//winningRows in the table/array match one of these 8 options, could save as a constant
// const winningRows= [
// [0, 1, 2], 
// [0, 4, 8], 
// [0, 3, 6], 
// [1, 4, 7], 
// [2, 5, 8], 
// [2, 4, 6], 
// [3, 4, 5], 
// [6, 7, 8]
// ]

//reset button that starts a new game
const newGame = () => {
    squares.forEach((square, index) => {
        squares[index] = null;
    });
    cellSet.forEach((cell) => {
        cell.innerText = "";
    });
    turnMarker = xPlayer;
    winOrDraw.style.opacity = "0";
    winOrDraw.innerText = "";
    turnNotifier.innerText = `Now playing: ${turnMarker}`;
}
resetButton.addEventListener('click', newGame);

//make sure to call the functions after you make it. 
newGame();
drawBoard();