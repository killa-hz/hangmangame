const wrongLetterElement = document.getElementById('wrong-letter-list');
const word = document.getElementById('word');
const notification = document.getElementById('notification');
const modal = document.getElementById('modal-container');
const modalText = document.getElementById('modal-text');
const playButton = document.getElementById('play-button');
const container = document.getElementById('container');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['hello', 'photography', 'music', 'interface'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//display selectedWord, correct letters are shown
function displayWord() {
  word.innerHTML = `${selectedWord
    .split('')
    .map((letter) => {
      return `<span class="letter">${
        correctLetters.includes(letter) ? letter : ''
      }</span>`;
    })
    .join('')} `;
}

//display notification
function displayNotification() {
  notification.style.display = 'inline-flex';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 1500);
}

//display wrong letters
function displayWrongLetters() {
  wrongLetterElement.innerHTML = `${wrongLetters
    .map((letter) => {
      return `<span class='wrong-letter'>${letter}</span>`;
    })
    .join('')}`;
}

//display figure
function displayFigure() {
  figureParts.forEach((part, index) => {
    const mistakes = wrongLetters.length;
    if (index < mistakes) {
      part.style.display = 'inline-block';
    } else {
      part.style.display = 'none';
    }
  });
}
//check for win
function winCheck() {
  const innerText = word.innerText.replace(/\n/g, '');

  if (innerText === selectedWord) {
    modalText.innerText = 'Congratulations, you win!';
    modal.style.display = 'flex';
  }
}

//check for loss
function lossCheck() {
  if (wrongLetters.length === 6) {
    modalText.innerText = 'Sorry, you lose!';
    modal.style.display = 'flex';
  }
}
//wrong letter alert
function wrongLetterFlash() {
  container.style.backgroundColor = '#ff5722';
  setTimeout(() => {
    container.style.backgroundColor = '#1b262c';
  }, 100);
}

//handle letter input
window.addEventListener('keydown', (e) => {
  const keyCode = e.keyCode;
  const key = e.key;
  if (keyCode >= 65 && keyCode <= 90) {
    if (selectedWord.includes(key)) {
      if (!correctLetters.includes(key)) {
        correctLetters.push(key);
        displayWord();
        winCheck();
      } else {
        notification.innerText = 'You have already guessed this letter.';
        displayNotification();
      }
    } else {
      if (!wrongLetters.includes(key)) {
        wrongLetters.push(key);
        displayWrongLetters();
        wrongLetterFlash();
        displayFigure();
        lossCheck();
      } else {
        notification.innerText = 'You have already guessed this letter.';
        displayNotification();
      }
    }
  } else {
    notification.innerText = 'That is not a valid letter.';
    displayNotification();
  }
});

playButton.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord);
  displayWord();
  displayFigure();
  displayWrongLetters();
  modal.style.display = 'none';
});

displayWord();
