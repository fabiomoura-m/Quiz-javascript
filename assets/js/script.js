// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Functions
function showQuestion() {
  if (questions[currentQuestion]) {
    let query = questions[currentQuestion];

    let percentage = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector('.progress--bar').style.width = `${percentage}%`;

    document.querySelector('.scoreArea').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'block';

    document.querySelector('.question').innerHTML = query.question;
    let optionsHtml = '';
    for (let i in query.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${query.options[i]}</div>`;
    }
    document.querySelector('.options').innerHTML = optionsHtml;

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute('data-op'));
  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }
  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let score = Math.floor((correctAnswers / questions.length) * 100);

  if (score < 40) {
    document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein?!';
    document.querySelector('.scorePct').style.color = '#FF0000F';
  } else if (score >= 40 && score < 70) {
    document.querySelector('.scoreText1').innerHTML =
      'Muito bom, mas poderia melhorar';
    document.querySelector('.scorePct').style.color = 'FFFF00';
  } else if (score >= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Parabéns';
    document.querySelector('.scorePct').style.color = '#0D630D';
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${score}%`;
  document.querySelector(
    '.scoreText2'
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

  document.querySelector('.questionArea').style.display = 'none';
  document.querySelector('.scoreArea').style.display = 'block';
  document.querySelector('.progress--bar').style.width = '100%';
}
