// File: /tic-tac-toe-ai/tic-tac-toe-ai/js/app.js

const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector(".msg-container");
const msg = document.getElementById("msg");
const newGameBtn = document.getElementById("new-btn");
const resetBtn = document.getElementById("reset-btn");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleBoxClick(event) {
  const clickedBox = event.target;
  const boxIndex = Array.from(boxes).indexOf(clickedBox);

  if (gameState[boxIndex] !== "" || !gameActive) {
    return;
  }

  updateGameState(boxIndex);
  checkResult();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") {
      aiMove();
    }
  }
}

function updateGameState(index) {
  gameState[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;
  
  // Add player-specific class for styling
  if (currentPlayer === 'X') {
    boxes[index].classList.add('player-x');
  } else {
    boxes[index].classList.add('player-o');
  }
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    msg.textContent = `${currentPlayer} has won!`;
    gameActive = false;
    msgContainer.classList.remove("hide");
    return;
  }

  if (!gameState.includes("")) {
    msg.textContent = "It's a draw!";
    gameActive = false;
    msgContainer.classList.remove("hide");
  }
}

function aiMove() {
  // Convert 1D gameState array to 2D board for minimax algorithm
  const board2D = [
    [gameState[0], gameState[1], gameState[2]],
    [gameState[3], gameState[4], gameState[5]],
    [gameState[6], gameState[7], gameState[8]],
  ];

  // Call the minimax AI function from ai.js to determine the best move
  const move = bestMove(board2D);

  if (move) {
    // Convert 2D coordinates back to 1D index
    const index = move.i * 3 + move.j;
    updateGameState(index);
    checkResult();
    if (gameActive) {
      currentPlayer = "X";
    }
  }
}

function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove('player-x', 'player-o');
  });
  msgContainer.classList.add("hide");
}

boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
