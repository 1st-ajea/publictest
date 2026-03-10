document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("drawBtn");
  button.addEventListener("click", generateLotto);
});

function generateLotto() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // 초기화

  for (let i = 0; i < 5; i++) {
    let numbers = [];
    while (numbers.length < 6) {
      let num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    numbers.sort((a, b) => a - b);

    const gameDiv = document.createElement("div");
    gameDiv.className = "lotto-game";

    numbers.forEach((n, idx) => {
      const ball = document.createElement("span");
      ball.className = "lotto-ball";
      ball.dataset.final = n;
      ball.textContent = "?";
      gameDiv.appendChild(ball);

      setTimeout(() => animateBall(ball), idx * 700);
    });

    resultsDiv.appendChild(gameDiv);
  }
}

function animateBall(ball) {
  let count = 0;
  const interval = setInterval(() => {
    ball.textContent = Math.floor(Math.random() * 45) + 1;
    count++;
    if (count > 10) {
      clearInterval(interval);
      ball.textContent = ball.dataset.final;
      ball.style.background = getBallColor(ball.dataset.final);
      ball.classList.add("final");

      // 🎵 사운드 효과 재생
      const sound = document.getElementById("popSound");
      sound.currentTime = 0; // 처음부터 재생
      sound.play();
    }
  }, 100);
}

function getBallColor(num) {
  num = parseInt(num);
  if (num <= 10) return "radial-gradient(circle, #ff4d4d, #b30000)"; // 빨강
  else if (num <= 20) return "radial-gradient(circle, #4da6ff, #004080)"; // 파랑
  else if (num <= 30) return "radial-gradient(circle, #66ff66, #008000)"; // 초록
  else if (num <= 40) return "radial-gradient(circle, #ffcc66, #cc6600)"; // 주황
  else return "radial-gradient(circle, #cc99ff, #6600cc)"; // 보라
}