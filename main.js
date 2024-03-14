import { words } from "./db.js";

const keyBoard = document.querySelector(".keyboard");
const board = document.querySelector(".board");

let round = 0;
let inputCount = 0;
let currentWord = "";
// console.log(words)

keyBoard.addEventListener("click", (e) => {
    // console.log(e.target.innerText)
    // console.log(board.children[round])

    const activeRow = board.children[round];
    // console.log(activeRow);
    // console.log(e.target.innerText);
    // console.log(e.target.innerText.length);

    if (e.target.innerText.length === 1 && round <= 5) {
        activeRow.children[inputCount].innerHTML = e.target.innerText;
        currentWord += e.target.innerText;

        // console.log(currentWord);
        // console.log(activeRow.children[inputCount])
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
