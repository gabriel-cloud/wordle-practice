import { useEffect, useState } from 'react';
import { checkWord } from '../gameLogic';
import './keyboard.css';
import { checkGameStatus } from '../gameLogic';

export const BetterKeyboard = ({
  setKeyboardInput,
  setWords,
  gameNumber,
  setGameNumber,
  gameStatus,
  setGameStatus,
  setShowModal,
  todayWord,
  wordList,
  setWrongWordModal,
  saveAllToLocalStorage,
  checkWordOnRefresh,
  words,
}) => {
  let firstRow = 'QWERTYUIOP';
  let secondRow = 'ASDFGHJKL';
  let thirdRow = 'ZXCVBNM';
  const [letterPressed, setLetterPressed] = useState('');

  const handleDetele = () => {
    setLetterPressed(letterPressed.slice(0, -1));
  };

  const addStringToClass = (classToSearchFor, stringToAdd) => {
    let liveLetters = document.getElementsByClassName(classToSearchFor);
    for (const letter of liveLetters) {
      if (!letter.className.includes(stringToAdd)) {
        letter.className += stringToAdd;
      }
    }
  };

  const reomoveStringFromClass = (classToSearchFor, stringToRemove) => {
    let liveLetters = document.getElementsByClassName(classToSearchFor);
    for (const letter of liveLetters) {
      letter.className = letter.className.replace(stringToRemove, '');
    }
  };

  const handlePress = (letter) => {
    if (gameStatus === 'inProgress') {
      if (letter === 'delete' || letter === 'BACKSPACE') {
        reomoveStringFromClass('live', 'wrong');
        handleDetele();
      } else if (letter === 'enter' || letter === 'ENTER') {
        if (
          letterPressed.length === 5 &&
          wordList.includes(letterPressed.toLowerCase())
        ) {
          setTimeout(() => {
            setGameNumber((gameNumber) => gameNumber + 1);
          }, 10);
          setWords((words) => [...words, letterPressed]);
          setTimeout(() => {
            checkWord(
              letterPressed,
              todayWord,
              gameNumber,
              setGameStatus,
              setShowModal
            );
          }, 20);
          setTimeout(() => {
            // checkGameStatus(gameStatus, gameNumber, setGameStatus);
          }, 3000);
          setLetterPressed('');
        }
        if (
          letterPressed.length === 5 &&
          !wordList.includes(letterPressed.toLowerCase())
        ) {
          addStringToClass('live', ' wrong');
          //show modal
          setWrongWordModal(true);
          //hide modal
          setTimeout(() => {
            setWrongWordModal(false);
          }, 2000);
        }
      } else {
        if (letterPressed.length < 5 && 'QWERTYUIOPASDFGHJKLZXCVBNM'.includes(letter)) {
          if (gameNumber < 5) {
            setLetterPressed(letterPressed + letter);
          }
        }
      }
    }
  };

  const handleKeyboardPress = (e) => {
    let currentLetter = e.key.toUpperCase();
    handlePress(currentLetter);
  };

  useEffect(() => {
    checkGameStatus(gameStatus, gameNumber, setGameStatus, setShowModal);
  }, [words, gameNumber, letterPressed]);

  useEffect(() => {
    checkWordOnRefresh(words);
    if (words.length > 0) {
      saveAllToLocalStorage();
    }
  }, []);

  useEffect(() => {
    setKeyboardInput(letterPressed);
    document.addEventListener('keyup', handleKeyboardPress);
    return () => {
      document.removeEventListener('keyup', handleKeyboardPress);
    };
  }, [handleKeyboardPress]);

  return (
    <div className="keyboard">
      {firstRow.split('').map((letter, key) => (
        <button
          onClick={() => handlePress(letter)}
          key={key}
          value={letter}
          id={letter}
          className="keyboardKey"
        >
          {letter}
        </button>
      ))}
      <br />
      {secondRow.split('').map((letter, key) => (
        <button
          onClick={() => handlePress(letter)}
          key={key}
          value={letter}
          id={letter}
          className="keyboardKey"
        >
          {letter}
        </button>
      ))}

      <br />

      <button
        onClick={() => handlePress('delete')}
        value="delete"
        id="delete"
        className="keyboardKey"
      >
        ⌫
      </button>

      {thirdRow.split('').map((letter, key) => (
        <button
          onClick={() => handlePress(letter)}
          key={key}
          value={letter}
          id={letter}
          className="keyboardKey"
        >
          {letter}
        </button>
      ))}

      <button
        onClick={() => handlePress('enter')}
        value="enter"
        id="enter"
        className="keyboardKey"
      >
        ↵
      </button>
    </div>
  );
};
