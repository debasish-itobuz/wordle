import { words } from "./db.js";

const keyBoard = document.querySelector(".keyboard");
const board = document.querySelector(".board");

let round = 0;
let inputCount = 0;
let currentWord = "";

keyBoard.addEventListener("click", (e) => {
    const activeRow = board.children[round];

    if (e.target.innerText.length === 1 && round <= 5) {
        activeRow.children[inputCount].innerHTML = e.target.innerText;
        currentWord += e.target.innerText;
        inputCount++;
        if (inputCount === 5) {
            const data = words.find((item) => {
                if (item.toLowerCase() === currentWord.toLowerCase()) return true;
                else return false;
            });
            inputCount = 0;
            currentWord = "";
            round++;
            console.log(data);
        }
    }
    e.stopPropagation();
});
