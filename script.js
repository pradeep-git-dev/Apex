let currentQuestion = 1;
let selectedAnswers = {};
const totalQuestions = 5; // Updated totalQuestions to 5
const correctAnswers = {
  1: 'a', // Internet Protocol
  2: 'b', // Router
  3: 'b', // Translate domain names to IP addresses
  4: 'c', // Transport Layer
  5: 'b'  // SMTP
};
let quizSubmitted = false;

function updateQuizDisplay() {
  for (let i = 1; i <= totalQuestions; i++) {
    document.getElementById('q' + i).classList.remove('active');
  }
  document.getElementById('q' + currentQuestion).classList.add('active');
  document.getElementById('quizCounter').innerText = `Question ${currentQuestion} of ${totalQuestions}`;

  document.querySelector('.quiz-nav button:nth-child(3)').disabled = quizSubmitted; // Submit button

  if (!quizSubmitted) {
    const options = document.getElementById('q' + currentQuestion).querySelectorAll('.quiz-option');
    options.forEach(btn => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      btn.disabled = false;
      const optionValue = btn.getAttribute('onclick').split(',')[1].replace(/'/g, '').trim();
      if (selectedAnswers[currentQuestion] === optionValue) {
        btn.classList.add('selected');
      }
    });
  } else {
    applyResultStyles();
    const options = document.getElementById('q' + currentQuestion).querySelectorAll('.quiz-option');
    options.forEach(btn => {
      btn.disabled = true;
    });
  }
}

function nextQuestion() {
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    updateQuizDisplay();
  }
}

function prevQuestion() {
  if (currentQuestion > 1) {
    currentQuestion--;
    updateQuizDisplay();
  }
}

function selectOption(q, answer, el) {
  if (quizSubmitted) return;

  selectedAnswers[q] = answer;
  const options = document.getElementById('q' + q).querySelectorAll('.quiz-option');
  options.forEach(btn => btn.classList.remove('selected'));
  el.classList.add('selected');
}

function submitQuiz() {
  quizSubmitted = true;
  let score = 0;
  for (let q = 1; q <= totalQuestions; q++) {
    const selected = selectedAnswers[q];
    const correct = correctAnswers[q];

    if (selected === correct) {
      score++;
    }
  }

  document.getElementById('quizResult').innerText = `You scored ${score} out of ${totalQuestions}`;
  applyResultStyles();
  disableQuizOptions();
  document.querySelector('.quiz-nav button:nth-child(3)').disabled = true;
}

function applyResultStyles() {
  for (let q = 1; q <= totalQuestions; q++) {
    const selected = selectedAnswers[q];
    const correct = correctAnswers[q];
    const options = document.getElementById('q' + q).querySelectorAll('.quiz-option');

    options.forEach(btn => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      const optionValue = btn.getAttribute('onclick').split(',')[1].replace(/'/g, '').trim();

      if (optionValue === correct) {
        btn.classList.add('correct');
      }

      if (optionValue === selected && selected !== correct) {
        btn.classList.add('incorrect');
      }
    });
  }
}

function disableQuizOptions() {
  for (let q = 1; q <= totalQuestions; q++) {
    const options = document.getElementById('q' + q).querySelectorAll('.quiz-option');
    options.forEach(btn => {
      btn.disabled = true;
    });
  }
}

function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      document.getElementById("jokeDisplay").innerText = `${data.setup} — ${data.punchline}`;
    })
    .catch(error => {
      document.getElementById("jokeDisplay").innerText = "Failed to fetch a joke. Please try again later.";
      console.error("Error fetching joke:", error);
    });
}

updateQuizDisplay();