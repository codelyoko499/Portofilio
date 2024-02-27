const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let playerSequence = [];
let round = 1;
let roundsSequence = [];

function generateSequence() {
  sequence = [];
  const newColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(newColor);
  roundsSequence = roundsSequence.concat(sequence);
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashColor(roundsSequence[i]);
    i++;
    if (i >= roundsSequence.length) {
      clearInterval(interval);
      playerSequence = [];
    }
  }, 1000);
}

function flashColor(color) {
  playSound(color);
  const element = document.getElementById(color);
  element.style.transition = "background-color 0.5s, transform 0.5s";
  element.style.backgroundColor = getHoverColor(color);
  element.style.transform = "scale(0.9)";
  setTimeout(() => {
    element.style.backgroundColor = getOriginalColor(color);
    element.style.transform = "scale(1)";
  }, 500);
}

function getHoverColor(color) {
  switch (color) {
    case "green":
      return "#ff333377";
    case "red":
      return "#33cc337a";
    case "yellow":
      return "#3333ff6b";
    case "blue":
      return "#ffff336e";
    default:
      return "";
  }
}

function getOriginalColor(color) {
  switch (color) {
    case "green":
      return "#ff3333";
    case "red":
      return "#33cc33";
    case "yellow":
      return "#3333ff";
    case "blue":
      return "#ffff33";
    default:
      return "";
  }
}

function playSound(color) {
  const audio = document.getElementById(`${color}-sound`);
  audio.play();
}

function handleClick(event) {
  const clickedColor = event.target.id;
  flashColor(clickedColor);
  playSound(clickedColor);
  playerSequence.push(clickedColor);
  if (playerSequence.length === roundsSequence.length) {
    if (JSON.stringify(playerSequence) === JSON.stringify(roundsSequence)) {
      if (round < 100) {
        round++;
        generateSequence();
        setTimeout(() => {
          playSequence();
        }, 1000);
        document.getElementById("round-number").innerText = round;
      } else {
        alert("Congratulation! next step:");
      }
    } else {
      alert("You failed try again!");
      round = 1;
      roundsSequence = [];
      generateSequence();
      setTimeout(() => {
        playSequence();
      }, 1000);
      document.getElementById("round-number").innerText = round;
    }
  }
}

function startGame() {
  round = 1;
  roundsSequence = [];
  generateSequence();
  playSequence();
  document.getElementById("round-number").innerText = round;
}

document.getElementById("start").addEventListener("click", startGame);
document.querySelectorAll(".color").forEach((color) => {
  color.addEventListener("click", handleClick);
});
