import { words } from "./db.js";

const keyBoard = document.querySelector(".keyboard");
const board = document.querySelector(".board");
const random = Math.floor(Math.random() * words.length);
const playWord = words[random].toLowerCase();
let round = 0;
let inputCount = 0;
let currentWord = "";
let winner = false;

console.log(words[random]);


keyBoard.addEventListener("click", (e) => {
    const activeRow = board.children[round];

    if (!winner && e.target.innerText.length === 1 && round <= 5 && inputCount < 5) {
        activeRow.children[inputCount].innerHTML = e.target.innerText;
        currentWord += e.target.innerText;
        inputCount++;
    }

    if (!winner && e.target.innerText === "Enter" && inputCount === 5) {
        let count = 0;
        for (let index = 0; index < 5; index++) {
            const char = playWord.charAt(index).toLowerCase();
            const myChar = currentWord.charAt(index).toLowerCase();
            console.log(activeRow.children[index], char, myChar);
            if (myChar === char) {
                count++;
                activeRow.children[index].style.backgroundColor = "#58a351";
            } else {

                if (playWord.includes(myChar)) {
                    activeRow.children[index].style.backgroundColor = "#b59f3b";
                }
                else {
                    activeRow.children[index].style.opacity = "0.7";
                }
            }
        }
        if (count === 5) {
            winner = true;
        }
        inputCount = 0;
        currentWord = "";
        round++;
    }
    if (!winner && e.target.innerText === "Del" && inputCount > 0) {
        currentWord = currentWord.slice(0, currentWord.length);
        inputCount--;
        activeRow.children[inputCount].innerHTML = ""
        

    }

});
