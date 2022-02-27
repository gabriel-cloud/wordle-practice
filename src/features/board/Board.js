import './board.css';
import * as React from 'react';
import { RowLetter } from './rowLetter/RowLetter';

export const Board = ({ words, keyboardInput, gameNumber }) => {
  let liveKeyboardInput = [];
  liveKeyboardInput[0] = keyboardInput;

  return (
    <>
      <div className="parent parent2">
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
        <div className="letter live"></div>
      </div>
      <div className="parent">
        {/* render letters live */}
        {keyboardInput.split('').map((el, key) => (
          <div
            className={'letter div' + (key + 1 + gameNumber * 5) + ' live'}
            key={key}
          >
            {el}
          </div>
        ))}

        {/* render words after enter */}
        {words.map((el, key) => (
          <RowLetter
            key={key}
            instance={key}
            wordRow={el}
            keyboardInput={keyboardInput}
            liveKeyboardInput={liveKeyboardInput}
            gameNumber={gameNumber}
          />
        ))}
      </div>
    </>
  );
};
