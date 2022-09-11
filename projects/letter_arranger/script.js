// Letter arranger
const textboxUnorderedLetters = document.querySelectorAll(
  ".unordered--letters"
);
const inputAnswer = document.querySelector("input");
const buttonCheck = document.querySelector(".check");
const buttonAgain = document.querySelector(".again");
const elScore = document.querySelector(".score");
const elHighScore = document.querySelector(".highscore");

const msg = document.querySelector(".msg2");

const letters = "a b c d e f g h i j k l m n o p q r s t u v w q y z".split(
  " "
);
let score = 0;
let highscore = 0;

const generateRandomJumbledWord = function () {
  let jumbled = "";
  for (let i = 0; i < 4; i++) {
    jumbled += letters[Math.trunc(Math.random() * letters.length)];
  }
  document.querySelector(".unordered--letters").textContent = jumbled;
  return jumbled;
};

let jumbledWord = generateRandomJumbledWord();

buttonCheck.addEventListener("click", function (e) {
  e.preventDefault();

  const answer = inputAnswer.value;
  const arranged = jumbledWord.split("").sort().join("");
  if (!answer) {
    msg.textContent = "Please enter a valid answer";
  } else if (answer !== arranged && answer) {
    msg.textContent = "Wrong answer... Try again";
  } else if (answer === arranged) {
    msg.textContent = "Correct!";
    score++;
    elScore.textContent = `Score: ${score}`;
    jumbledWord = generateRandomJumbledWord();

    if (score > highscore) {
      highscore = score;
      elHighScore.textContent = `High: ${highscore}`;
    }
  }
  inputAnswer.value = "";
});

buttonAgain.addEventListener("click", function (e) {
  e.preventDefault();

  jumbledWord = generateRandomJumbledWord();
  msg.textContent = "Start arranging...";
  inputAnswer.value = "";
  score = 0;
  elScore.textContent = `Score: ${score}`;
});
