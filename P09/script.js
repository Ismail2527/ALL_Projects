let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

let turn0 = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
boxes.forEach((val) => {
  val.addEventListener("click", function () {
    console.log("box clicked");
    if (turn0) {
      val.innerText = "0"; // Correct usage
      turn0 = false;
    } else {
      val.innerText = "X"; // Correct usage
      turn0 = true;
    }
    val.disabled = true; // Disable the box after a click
    checkWinner();
  });
});
const resetGame = () => {
  turn0 = true;
  enabledBoxe();
  msgContainer.classList.add("hide");
};
const disabledBoxe = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enabledBoxe = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val == pos2val && pos2val == pos3val) {
        // alert(`Player ${pos1val} wins!`);
        disabledBoxe();
        showWinner(pos1val);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
