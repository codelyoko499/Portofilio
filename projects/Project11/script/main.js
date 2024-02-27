const cells = Array.from(document.querySelectorAll(".cell"));
const winnerDisplay = document.querySelector(".display_winner_hide");
const resetButton = document.querySelector("#Restart");
let turn = "X";
let gameOver = false;
const clickSound = document.getElementById("clickSound");
const winnerSound = document.getElementById("winnerSound");
const drawSound = document.getElementById("aDraw");

const resetBoard = () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  gameOver = false;
  document.querySelector(".player_turn").style.display = "block";
  winnerDisplay.style.display = "none";
  turn = "X";
  document.querySelector(".display_player_turn").innerHTML = "X";
};
window.addEventListener("DOMContentLoaded", () => {
  resetBoard();
});

resetButton.addEventListener("click", resetBoard);

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}
function playWinningSound() {
  winnerSound.currentTime = 0;
  winnerSound.play();
}
function playDrawSound() {
  drawSound.currentTime = 0;
  drawSound.play();
}

cells.forEach((box) => {
  box.innerHTML = "";
  box.addEventListener("click", () => {
    if (!gameOver && box.innerHTML === "") {
      box.innerHTML = turn;
      cheakWin();
      checkDraw();
      checkTurn();
      playClickSound();
    }
  });
});

function checkTurn() {
  if (turn === "X") {
    turn = "O";
    document.querySelector(".display_player_turn").innerHTML = "O";
  } else {
    turn = "X";
    document.querySelector(".display_player_turn").innerHTML = "X";
  }
}

function cheakWin() {
  let winCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (let i = 0; i < winCond.length; i++) {
    let v0 = cells[winCond[i][0]].innerHTML;
    let v1 = cells[winCond[i][1]].innerHTML;
    let v2 = cells[winCond[i][2]].innerHTML;

    if (v0 != "" && v0 === v1 && v0 === v2) {
      gameOver = true;
      winnerDisplay.style.display = "block";
      winnerDisplay.innerHTML = `${turn} Wins`;
      document.querySelector(".player_turn").style.display = "none";
      cells[winCond[i][0]].classList.add("winner");
      cells[winCond[i][1]].classList.add("winner");
      cells[winCond[i][2]].classList.add("winner");
      playWinningSound();
      break;
    }
  }
}

function checkDraw() {
  if (!gameOver) {
    let isDraw = true;
    cells.forEach((e) => {
      if (e.innerHTML === "") isDraw = false;
    });
    if (isDraw) {
      gameOver = true;
      winnerDisplay.style.display = "block";
      winnerDisplay.innerHTML = `its A Draw`;
      document.querySelector(".player_turn").style.display = "none";
      playDrawSound();
    }
  }
}
