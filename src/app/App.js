import React, { useState } from 'react';
import './App.css';
import { Board } from '../features/board/Board';
import { Header } from '../features/header/Header';
import { BetterKeyboard } from '../features/keyboard/BetterKeyboard';
import { ModalDialog } from './Modal/Modal';
import { wordList } from '../wordList/wordlist';
import { WrongWord } from './Modal/WrongLetter';
import { useEffect } from 'react';
import { checkWord } from '../features/gameLogic';
import { Settings } from './Modal/Settings';
import { ResetGameModal } from './Modal/ResetGame';

function App({ todayWordFixed }) {
  const [keyboardInput, setKeyboardInput] = useState('');
  const [words, setWords] = useState([]);
  const [gameNumber, setGameNumber] = useState(0);
  const [gameStatus, setGameStatus] = useState('inProgress');
  const [showModal, setShowModal] = useState(undefined);
  const [settings, setSettings] = useState(false);
  const [todayWord, setTodayWord] = useState(todayWordFixed);
  const [wrongWordModal, setWrongWordModal] = useState(false);
  const [cheat, setCheat] = useState(false);
  const [foundLocalStorage, setFoundLocalStorage] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    currentStreak: 0,
    maxStreak: 0,
    gamesWon: 0,
    gamesLost: 0,
    guess1: 0,
    guess2: 0,
    guess3: 0,
    guess4: 0,
    guess5: 0,
  });
  const [endGame, setEndGame] = useState(false);

  const saveStatsToLocalStorage = () => {
    let data = JSON.stringify(stats);
    localStorage.setItem('stats', data);
  };

  const loadStatsFromLocalStorage = () => {
    let statsState = JSON.parse(localStorage.getItem('stats'));
    if (statsState !== null) {
      setStats({
        gamesPlayed: statsState.gamesPlayed,
        currentStreak: statsState.currentStreak,
        maxStreak: statsState.maxStreak,
        gamesWon: statsState.gamesWon,
        gamesLost: statsState.gamesLost,
        guess1: statsState.guess1,
        guess2: statsState.guess2,
        guess3: statsState.guess3,
        guess4: statsState.guess4,
        guess5: statsState.guess5,
      });
    }
  };

  const saveAllToLocalStorage = () => {
    let data = JSON.stringify({
      keyboardInput: keyboardInput,
      words: words,
      gameNumber: gameNumber,
      gameStatus: gameStatus,
      showModal: showModal,
      todayWord: todayWord,
      wrongWordModal: wrongWordModal,
    });
    localStorage.setItem('appState', data);
  };

  const checkWordsOnLoad = (wordsArray) => {
    for (let i = 0; i < wordsArray.length; i++) {
      checkWord(wordsArray[i], todayWord, i, setGameStatus, setShowModal);
    }
  };


  const getStateFromLocalStorage = () => {
    let appState = JSON.parse(localStorage.getItem('appState'));
    if (appState !== null && appState.gameNumber !== 0) {
      setKeyboardInput(appState.keyboardInput);
      setWords(appState.words);
      setGameNumber(appState.gameNumber);
      setGameStatus(appState.gameStatus);
      setShowModal(appState.showModal);
      setTodayWord(appState.todayWord);
      setWrongWordModal(appState.wrongWordModal);
      setFoundLocalStorage(true);
    }
    if (appState !== null && (appState.gameStatus === 'won' || appState.gameStatus === 'lost')) {
      setEndGame(true);
    }
  };

  const resetKeyoardCss = () => {
    let keys = document.getElementsByClassName('keyboardKey');
    for (let i = 0; i < keys.length; i++) {
      keys[i].className = 'keyboardKey';
    }
  };

  const resetLocalData = () => {
    localStorage.removeItem('appState');
    localStorage.removeItem('stats');
  };

  const resetGame = (argument) => {
    setWords([]);
    setGameNumber(0);
    setGameStatus('inProgress');
    setShowModal(false);
    resetKeyoardCss();
    setEndGame(false);

    if (argument === true) {
      resetLocalData();
      setStats({
        gamesPlayed: 0,
        currentStreak: 0,
        maxStreak: 0,
        gamesWon: 0,
        gamesLost: 0,
        guess1: 0,
        guess2: 0,
        guess3: 0,
        guess4: 0,
        guess5: 0,
      });
    }
  };

  const updateLocalStats = (gameStatus) => {
    let maxStreakTemp =
      stats.currentStreak >= stats.maxStreak
        ? stats.currentStreak + 1
        : stats.maxStreak;
    if (gameStatus === 'won' && !endGame) {
      setStats({
        ...stats,
        gamesPlayed: stats.gamesPlayed + 1,
        currentStreak: stats.currentStreak + 1,
        maxStreak: maxStreakTemp,
        ['guess' + gameNumber]: stats['guess' + gameNumber] + 1,
        gamesWon: stats.gamesWon + 1,
      });
    }

    if (gameStatus === 'lost' && !endGame) {
      setStats({
        ...stats,
        gamesPlayed: stats.gamesPlayed + 1,
        currentStreak: 0,
        gamesLost: stats.gamesLost + 1,
      });
    }
  };

  useEffect(() => {
    getStateFromLocalStorage();
    loadStatsFromLocalStorage();
  }, []);

  useEffect(() => {
    saveAllToLocalStorage();
  }, [keyboardInput, gameNumber]);

  useEffect(() => {
    checkWordsOnLoad(words);
  }, [foundLocalStorage]);

  useEffect(() => {
    if (showModal !== undefined) {
      saveStatsToLocalStorage();
    }
  }, [showModal]);

  useEffect(() => {
    if (gameStatus !== 'inProgress') {
      updateLocalStats(gameStatus);
    }
    saveAllToLocalStorage();
  }, [gameStatus]);

  const resetGameAndStorage = () => {
    resetGame(true);
  };

  return (
    <div className="App">
      <Header
        setShowModal={setShowModal}
        resetGameAndStorage={resetGameAndStorage}
        setSettings={setSettings}
        showResetModal={showResetModal}
        setShowResetModal={setShowResetModal}
      />
      <WrongWord
        wrongWordModal={wrongWordModal}
        setWrongWordModal={setWrongWordModal}
      />
      <ResetGameModal
        resetGameAndStorage={resetGameAndStorage}
        showResetModal={showResetModal}
        setShowResetModal={setShowResetModal}
      />
      <ModalDialog
        gameStatus={gameStatus}
        showModal={showModal}
        setShowModal={setShowModal}
        todayWord={todayWord}
        resetGame={resetGame}
        setTodayWord={setTodayWord}
        stats={stats}
      />
      <Settings
        settings={settings}
        setSettings={setSettings}
        cheat={cheat}
        setCheat={setCheat}
      />
      {cheat && <p>Current word: {todayWord}</p>}
      <Board
        words={words}
        keyboardInput={keyboardInput}
        gameNumber={gameNumber}
      />
      <BetterKeyboard
        keyboardInput={keyboardInput}
        setKeyboardInput={setKeyboardInput}
        words={words}
        setWords={setWords}
        gameNumber={gameNumber}
        setGameNumber={setGameNumber}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        setShowModal={setShowModal}
        todayWord={todayWord}
        wordList={wordList}
        setWrongWordModal={setWrongWordModal}
        saveAllToLocalStorage={saveAllToLocalStorage}
        checkWordOnRefresh={checkWordsOnLoad}
      />
    </div>
  );
}

export default App;
