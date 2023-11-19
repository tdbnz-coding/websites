// game.js

let currentQuestionIndex;
let currentQuestion;
let currentCashValue;

// Load saved progress from localStorage
function loadSavedProgress() {
  const savedProgress = getCookie("gameProgress");
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    currentQuestionIndex = progress.currentQuestionIndex;
    currentCashValue = progress.currentCashValue;
    loadQuestion();
  }
}

// Save progress to localStorage
function saveProgress() {
  const progress = {
    currentQuestionIndex,
    currentCashValue
  };
  setCookie("gameProgress", JSON.stringify(progress), 14); // Expire in 14 days
}

function startGame() {
  currentQuestionIndex = 0;
  currentCashValue = 100;
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  document.getElementById("about-game").style.display = "none";
  document.getElementById("question-container").style.display = "block";
  document.getElementById("next-btn").innerHTML = "Next Question";
  shuffleArray(allQuestions);
  loadQuestion();
}

function loadQuestion() {
  currentQuestion = allQuestions[currentQuestionIndex];
  document.getElementById("question-number").innerHTML = `Question ${currentQuestionIndex + 1} - Worth $${formatNumberWithCommas(currentCashValue)}`;
  document.getElementById("question-text").innerHTML = currentQuestion.question;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  // Randomize the order of answer options
  const shuffledOptions = shuffleArray([...currentQuestion.options]);
  shuffledOptions.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "btn btn-light";
    button.innerHTML = option;
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  document.getElementById("next-btn").disabled = false;

  if (selectedOption === currentQuestion.correctAnswer) {
    document.getElementById("result-container").innerHTML = `<p class='text-success'>Correct! You've won $${formatNumberWithCommas(currentCashValue)}.</p>`;
    if (currentCashValue === 1000 || currentCashValue === 32000) {
      // Award $1,000 or $32,000 only if the corresponding question is answered correctly
      document.getElementById("result-container").innerHTML += `<p class='text-success'>You've reached a safe point!</p>`;
    }
  } else {
    document.getElementById("result-container").innerHTML = `<p class='text-danger'>Incorrect! You've failed. The correct answer is ${currentQuestion.correctAnswer}. You won $${formatNumberWithCommas(getGuaranteedAmount())}.</p>`;
    document.getElementById("next-btn").innerHTML = "Start Over";
  }

  // Save progress after answering
  saveProgress();
}

function loadNextQuestion() {
  if (document.getElementById("next-btn").innerHTML === "Start Over") {
    resetGame();
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < allQuestions.length) {
    currentCashValue = getCashValue(currentQuestionIndex);
    loadQuestion();
  } else {
    document.getElementById("question-container").innerHTML = `<h3>Congratulations! You've completed the quiz and won $${formatNumberWithCommas(currentCashValue)}.</h3>`;
    // Clear saved progress when the game is completed
    deleteCookie("gameProgress");
    document.getElementById("start-btn").style.display = "block";
    document.getElementById("instructions").style.display = "block";
    document.getElementById("about-game").style.display = "block";
  }

  document.getElementById("next-btn").disabled = true;
  document.getElementById("result-container").innerHTML = "";
}

function resetGame() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("start-btn").style.display = "block";
  document.getElementById("instructions").style.display = "block";
  document.getElementById("about-game").style.display = "block";
  document.getElementById("next-btn").innerHTML = "Next Question";
  document.getElementById("result-container").innerHTML = "";

  // Clear saved progress when starting over
  deleteCookie("gameProgress");
}

// Load saved progress on page load
window.onload = loadSavedProgress;
