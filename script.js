const result = document.querySelector("#result");
const board = document.querySelector(".board");
const keyBoard = document.querySelector(".keyboard");

let playWord = null

async function getWord() {
  const response = await fetch("http://localhost:8008/getWord")
  const data = await response.json()
  playWord = data.data
  console.log(playWord)
}
await getWord()

let round = 0;
let currentWord = "";
let inputCount = 0;
let winner = false;
let count = 0;
let index;
let activeRow = board.children[round];

function enterPressed() {
  for (index = 0; index < 5; index++) {
    const char = playWord.charAt(index).toLowerCase();
    const myChar = currentWord.charAt(index).toLowerCase();

    if (myChar === char) {
      count++;
      activeRow.children[index].style.backgroundColor = "#58a351";
    }
    else {
      if (playWord.includes(myChar)) {
        activeRow.children[index].style.backgroundColor = "#b59f3b";
      } else {
        activeRow.children[index].style.opacity = "0.7";
      }
    }
  }

  if (count === 5) {
    result.style.visibility = "visible";
    result.innerHTML = "You Win";
    winner = true;
  }

  inputCount = 0;
  round++;
  currentWord = "";

  if (round === 6) {
    result.style.visibility = "visible";
    if (!winner) return result.innerHTML += playWord;
  }

  activeRow = board.children[round];
}


keyBoard.addEventListener("click", (e) => {
  let boardText = e.target.innerText;
  
  if (!winner && boardText.length === 1 && round <= 5 && inputCount < 5) {
    activeRow.children[inputCount].innerHTML = boardText;
    currentWord += boardText;
    inputCount++;
  }

  if (!winner && boardText === "Enter" && inputCount === 5) {
    enterPressed(boardText);
  }

  if (!winner && boardText === "Del" && inputCount > 0) {
    currentWord = currentWord.slice(0, -1);
    inputCount--;
    activeRow.children[inputCount].innerHTML = "";
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key.match(/^[a-zA-Z]$/) && inputCount < 5) {
    let letter = String(event.key).toUpperCase();
    activeRow.children[inputCount].innerHTML = letter
    currentWord += letter
    inputCount++
  }

  if (event.key.toLowerCase() === 'enter') {
    enterPressed()
  }

});
