# Tic Tac Toe with AI - Complete Guide

Welcome to this detailed guide to the Tic Tac Toe game with AI! This document will help you understand how the game works, its key features, and break down the important functions in the codebase.

## Table of Contents

1. [Game Overview](#game-overview)
2. [Project Structure](#project-structure)
3. [HTML Structure](#html-structure)
4. [CSS Styling](#css-styling)
5. [JavaScript Files](#javascript-files)
   - [app.js - Core Game Logic](#appjs---core-game-logic)
   - [game.js - Game Management](#gamejs---game-management)
   - [ai.js - AI Implementation](#aijs---ai-implementation)
6. [How to Play](#how-to-play)
7. [Extending the Game](#extending-the-game)

## Game Overview

This is a Tic Tac Toe game where you play against an AI opponent. The game features:

- Player vs. AI gameplay
- Score tracking system
- Visual feedback for moves
- Win/draw detection
- Minimax algorithm for unbeatable AI

## Project Structure

The project follows this structure:

```
tic-tac-toe-ai/
├── index.html           # Main HTML file
├── css/
│   └── style.css        # Styling for the game
└── js/
    ├── app.js           # Core application logic
    ├── game.js          # Game state management
    └── ai.js            # AI implementation with minimax algorithm
```

## HTML Structure

The `index.html` file sets up the game's structure including:

- **Game Board**: A 3x3 grid of buttons representing the Tic Tac Toe board
- **Player Information**: Display of player name and score tracking
- **Game Controls**: Reset and New Game buttons
- **Win Notification**: A message container that appears when a game ends

## CSS Styling

The `style.css` file contains all the visual styling, including:

- **Layout**: Flexbox and grid-based layouts for responsive design
- **Visual Effects**: Gradients, shadows, and transitions for a modern look
- **Animations**: Score update animations and hover effects
- **Game State Visualization**: Different colors for X and O markers

## JavaScript Files

### app.js - Core Game Logic

This file contains the main game functionality and event handlers.

#### Key Functions:

##### `getPlayerName()`

```javascript
function getPlayerName() {
  let name = prompt("Enter your name:", "Player");
  if (!name) name = "Player";
  playerName = name;
  playerNameDisplay.textContent = playerName;
}
```

- **Purpose**: Prompts the user to enter their name when the game loads
- **Operation**: Sets a default "Player" if no name is entered
- **Importance**: Personalizes the game experience

##### `handleBoxClick(event)`

```javascript
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
```

- **Purpose**: Handles player clicks on the game board
- **Operation**:
  1. Identifies which box was clicked
  2. Checks if the move is valid
  3. Updates the game state
  4. Checks if the game is won/tied
  5. Switches player and triggers AI move if needed
- **Importance**: This is the primary way players interact with the game

##### `updateGameState(index)`

```javascript
function updateGameState(index) {
  gameState[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;

  // Add player-specific class for styling
  if (currentPlayer === "X") {
    boxes[index].classList.add("player-x");
  } else {
    boxes[index].classList.add("player-o");
  }
}
```

- **Purpose**: Updates the game state after a move
- **Operation**:
  1. Records the move in the game state array
  2. Updates the visual display of the board
  3. Adds appropriate styling based on the player (X or O)
- **Importance**: Maintains consistency between game logic and visual representation

##### `checkResult()`

```javascript
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
    // Victory handling logic
    // Updates score and displays winner message
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
```

- **Purpose**: Checks if the current state of the board results in a win or draw
- **Operation**:
  1. Checks all possible winning conditions
  2. If a win is found, updates scores and displays winner message
  3. If all cells are filled without a winner, declares a draw
- **Importance**: Critical for game flow and determining outcomes

##### `aiMove()`

```javascript
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
```

- **Purpose**: Handles the computer's move in the game
- **Operation**:
  1. Transforms the game state to a format usable by the AI
  2. Uses the minimax algorithm to determine the best move
  3. Applies the move and checks results
  4. Returns control to the player
- **Importance**: Enables single-player gameplay against the computer

##### `resetGame()`

```javascript
function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("player-x", "player-o");
  });
  msgContainer.classList.add("hide");

  // Always ensure player name is displayed correctly
  playerNameDisplay.textContent = playerName;
}
```

- **Purpose**: Resets the game to its initial state
- **Operation**:
  1. Resets game flags and state arrays
  2. Clears the visual board
  3. Hides any win/draw messages
  4. Ensures player information remains correct
- **Importance**: Allows players to play multiple rounds without refreshing

### game.js - Game Management

This file provides additional game management functionality. Note that there is some duplication with app.js, which suggests this could be refactored for a cleaner architecture.

#### Key Functions:

##### `handleBoxClick(event)`

```javascript
function handleBoxClick(event) {
  const clickedBox = event.target;
  const boxIndex = Array.from(boxes).indexOf(clickedBox);

  if (board[boxIndex] !== "" || !gameActive) {
    return;
  }

  board[boxIndex] = currentPlayer;
  clickedBox.textContent = currentPlayer;
  checkResult();
}
```

- **Purpose**: Similar to the function in app.js, handles player clicks
- **Operation**: Validates moves and updates both state and visuals
- **Importance**: Provides the click-to-play interaction for the game

##### `checkResult()`

```javascript
function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] === "" || board[b] === "" || board[c] === "") {
      continue;
    }
    if (board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "Game ended in a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
```

- **Purpose**: Checks for win or draw conditions
- **Operation**: Evaluates the board state against winning patterns
- **Importance**: Determines when a game ends and why

### ai.js - AI Implementation

This file contains the AI's decision-making logic using the minimax algorithm, which ensures the AI makes optimal moves.

#### Key Functions:

##### `minimax(board, depth, isMaximizing)`

```javascript
function minimax(board, depth, isMaximizing) {
  const scores = {
    X: -1,
    O: 1,
    tie: 0,
  };

  let result = checkWinner(board);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          board[i][j] = "O"; // AI is O
          let score = minimax(board, depth + 1, false);
          board[i][j] = ""; // Undo move
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          board[i][j] = "X"; // Player is X
          let score = minimax(board, depth + 1, true);
          board[i][j] = ""; // Undo move
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
```

- **Purpose**: Implements the minimax algorithm for AI decision making
- **Operation**:
  1. Recursively evaluates all possible future game states
  2. Assigns scores to end states (win/loss/draw)
  3. Works backward to determine the optimal move
  4. Uses maximizing/minimizing logic to simulate both players' best moves
- **Importance**: Makes the AI "intelligent" and challenging to beat

##### `checkWinner(board)`

```javascript
function checkWinner(board) {
  const winningCombinations = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return board[a[0]][a[1]];
    }
  }

  if (board.flat().every((cell) => cell !== "")) {
    return "tie";
  }

  return null;
}
```

- **Purpose**: Checks if the game has been won or tied
- **Operation**:
  1. Evaluates all possible winning combinations on the 2D board
  2. Returns the winner symbol or 'tie' if applicable
  3. Returns null if the game is ongoing
- **Importance**: Essential for the minimax algorithm to evaluate game states

##### `bestMove(board)`

```javascript
function bestMove(board) {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        board[i][j] = "O"; // AI is O
        let score = minimax(board, 0, false);
        board[i][j] = ""; // Undo move
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }

  return move;
}
```

- **Purpose**: Determines the best possible move for the AI
- **Operation**:
  1. Tries each available position on the board
  2. Uses minimax to evaluate the future consequences of each move
  3. Selects the move with the highest score (most likely to lead to win)
- **Importance**: This is the entry point for the AI's decision making, ensuring it plays optimally

## How to Play

1. When you open the game, you'll be prompted to enter your name
2. You play as "X" and the computer plays as "O"
3. Click on any empty cell to make your move
4. The AI will automatically make its move after you
5. The first to get three of their symbols in a row (horizontal, vertical, or diagonal) wins
6. The score is tracked at the top of the screen
7. Click "Reset Game" to start a new round or "New Game" after a win/draw

## Extending the Game

Want to add features to the game? Here are some ideas:

- Add difficulty levels by limiting the minimax depth
- Implement a two-player mode
- Add sound effects for moves and wins
- Create a game history tracker
- Add animations for win conditions
- Implement a timer for each move

---

This Tic Tac Toe game demonstrates important programming concepts like:

- Event handling
- Game state management
- Recursive algorithms (minimax)
- DOM manipulation
- CSS animations and styling

Have fun playing and exploring the code!
