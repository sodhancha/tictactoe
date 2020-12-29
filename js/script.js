// setting classes into variables
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

// setting the winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// selection of blocks in tictactoe
const cellElements = document.querySelectorAll("[data-cell]");

// selection of the entire board
const board = document.getElementById("board");

// selection of the after game block
const winningMessageElement = document.getElementById("winningMessage");

// selection of the restart button
const restartButton = document.getElementById("restartButton");

// selection of the winning message
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

// declaration of turn variable
let circleTurn;

// initialization of game
startGame();

// initialization of game after it ends
restartButton.addEventListener("click", startGame);

function startGame() {
  // setting initial turn of x
  circleTurn = false;

  // marking of cell after each turn
  cellElements.forEach((cell) => {
    // removing classes and events before the start of game
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);

    //  setting listeners so it can only be clicked once
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  // selection of the marked cell
  const cell = e.target;

  // checking whose turn it is
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  // marking the selected cell
  placeMark(cell, currentClass);

  // check if game ends
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();

    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// marking selected cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// changing turns
function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// checking win
function checkWin(currentClass) {
  // checking if any winning combination is satified
  return WINNING_COMBINATIONS.some((combination) => {
    // returning the array of combinations
    return combination.every((index) => {
      // returning the position of the current class elements
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
