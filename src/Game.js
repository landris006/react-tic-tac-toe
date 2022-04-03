import React, { useState } from 'react';
import './Game.css';

const Game = ({ dispatch, matrix, circleStarts, toWin, size }) => {
  const [circleTurn, setCircleTurn] = useState(circleStarts);

  return (
    <>
      <h1>{circleTurn ? 'O' : 'X'}'s turn</h1>
      <div
        className="game-container"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {matrix.map((row, rowIndex) => {
          return row.map((item, colIndex) => {
            const state = matrix[rowIndex][colIndex];
            const extraClassName =
              state === 0
                ? `unclaimed-${circleTurn ? 'circle' : 'cross'}`
                : state === 1
                ? 'cross'
                : 'circle';

            return (
              <div
                key={rowIndex * row.length + colIndex}
                className={`field ${extraClassName}`}
                style={{
                  width: `${36 / size}vw`,
                  height: `${36 / size}vw`,
                }}
                onClick={() => setCircleTurn(true)}
              ></div>
            );
          });
        })}
      </div>
    </>
  );
};

export default Game;
