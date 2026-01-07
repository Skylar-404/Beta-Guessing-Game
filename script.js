document.addEventListener("DOMContentLoaded", () => {
  let targetNumber;
  let attempts = 0;
  let gameOver = false;

  const guessInput = document.getElementById("guess-input");
  const guessBtn = document.getElementById("guess-btn");
  const restartBtn = document.getElementById("restart-btn");
  const feedback = document.getElementById("feedback-message");
  const attemptDisplay = document.getElementById("attempt-count");
  const hintDisplay = document.getElementById("hint-text");
  const glassCard = document.querySelector(".glass-card");

  const initGame = () => {
    targetNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 0;
    gameOver = false;

    attemptDisplay.textContent = "0";
    hintDisplay.textContent = "---";
    feedback.textContent = "Teay Mok!";
    feedback.style.color = "var(--secondary)";
    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessBtn.textContent = "GUESS";
    glassCard.classList.remove("win-animation");

    console.log("Target Number (Cheat):", targetNumber);
  };

  const handleGuess = () => {
    if (gameOver) return;

    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 10) {
      showFeedback("Ah t'nerb ke oy hg teay between 1 and 10", "#ff4b2b");
      triggerShake();
      return;
    }

    attempts++;
    attemptDisplay.textContent = attempts;

    if (guess === targetNumber) {
      winGame();
    } else {
      provideHint(guess);
      triggerShake();
    }

    guessInput.value = "";
    guessInput.focus();
  };

  const provideHint = (guess) => {
    const diff = Math.abs(guess - targetNumber);
    let direction = guess > targetNumber ? "Too HIGH" : "Too LOW";
    let temperature = "";

    if (diff <= 3) {
      temperature = "(Jit Trov hx)";
      feedback.style.color = "#00d2ff";
    } else if (diff <= 5) {
      temperature = "(Khos hx ah ach)";
      feedback.style.color = "#ff914d";
    } else {
      temperature = "(Lers hx ah jm)";
      feedback.style.color = "#ff4b2b";
    }

    hintDisplay.textContent = direction;
    feedback.textContent = `${direction} & ${temperature}`;
  };

  const winGame = () => {
    gameOver = true;
    feedback.textContent = `🎉 Trov hx Nigga! You got it in ${attempts} attempts!`;
    feedback.style.color = "#00ff88";
    hintDisplay.textContent = "MATCHED";
    guessInput.disabled = true;
    guessBtn.disabled = true;
    guessBtn.textContent = "YOU WON!";
    glassCard.classList.add("win-animation");
  };

  const showFeedback = (msg, color) => {
    feedback.textContent = msg;
    feedback.style.color = color;
  };

  const triggerShake = () => {
    glassCard.classList.remove("shake");
    void glassCard.offsetWidth; // Trigger reflow
    glassCard.classList.add("shake");
  };

  guessBtn.addEventListener("click", handleGuess);

  guessInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleGuess();
  });

  restartBtn.addEventListener("click", initGame);

  // Initial game setup
  initGame();
});
