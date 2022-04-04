import React, { useEffect } from 'react';
import './Game.css';

const Game = ({
  dispatch,
  matrix,
  circleTurn,
  toWin,
  size,
  winner,
  winningFields,
}) => {
  return (
    <>
      <h1>{circleTurn ? 'O' : 'X'}'s turn</h1>
      <div
        className="game-container"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {matrix.map((row, rowIndex) => {
          return row.map((field, colIndex) => {
            const status = matrix[rowIndex][colIndex];
            const isWinnerField = winningFields?.find(
              (field) =>
                JSON.stringify(field) === JSON.stringify([rowIndex, colIndex])
            );
            const extraClassName =
              status === 0 && !winner
                ? `unclaimed-${circleTurn ? 'circle' : 'cross'}`
                : status === 1
                ? 'cross'
                : status === -1
                ? 'circle'
                : '';

            return (
              <div
                key={rowIndex * row.length + colIndex}
                className={`field ${extraClassName} ${
                  isWinnerField && 'winner'
                }`}
                style={{
                  width: `${36 / size}vw`,
                  height: `${36 / size}vw`,
                  cursor: `${winner && 'not-allowed'}`,
                }}
                onClick={() =>
                  dispatch({
                    type: 'CAPTURE',
                    payload: { rowIndex, colIndex },
                  })
                }
              ></div>
            );
          });
        })}
      </div>
    </>
  );
};

export default Game;
