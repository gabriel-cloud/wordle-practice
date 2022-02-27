export const checkWord = (
  inputWord,
  todayWord,
  gameNumber,
  setGameStatus,
  setShowModal
) => {
  if (inputWord === todayWord) {
    setGameStatus('won');
    setShowModal(true);
  }

  const inputWordArray = inputWord.split('');

  const todayWordArray = todayWord.split('');

  inputWordArray.forEach((letter, index) => {
    if (inputWordArray[index] === todayWordArray[index]) {
      addClass(gameNumber, index, 'correct');
      changeKeyboardColour(letter, 'correct');
    } else if (todayWordArray.includes(inputWordArray[index])) {
      addClass(gameNumber, index, 'correctWrongPosition');
      changeKeyboardColour(letter, 'correctWrongPosition');
    } else {
      addClass(gameNumber, index, 'incorrect');
      changeKeyboardColour(letter, 'incorrect');
    }
  });
};

export const addClass = (gameNumber, index, colour) => {
  let className = 'div' + (gameNumber * 5 + (index + 1));
  document.getElementsByClassName(className)[0].id = colour;
};

export const checkGameStatus = (
  gameStatus,
  gameNumber,
  setGameStatus,
  setShowModal
) => {
  if (gameStatus === 'inProgress' && gameNumber === 5) {
    setGameStatus('lost');
    setShowModal(true);
  }

  if (gameStatus === 'won') {
    setShowModal(true);
  }
};

export const changeKeyboardColour = (letter, colour) => {
  document.getElementById(letter).className = 'keyboardKey ' + colour;
};

