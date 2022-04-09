export const initialState = {
  inProgress: false,

  matrix: [],
  circleTurn: false,
  toWin: 1,
  winner: '',
};

export default function reducer(state, { type, payload }) {
  if (type === 'START') {
    console.log('start');
    const { size, toWin, circleTurn } = payload;
    const matrix = [];

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(0);
      }
      matrix.push(row);
    }
    return { ...state, toWin, circleTurn, inProgress: true, matrix, size };
  }

  if (type === 'CAPTURE') {
    const { rowIndex, colIndex } = payload;
    const matrix = state.matrix.map((row) => [...row]);
    const { toWin } = state;

    if (matrix[rowIndex][colIndex] !== 0 || state.winner) {
      return state;
    }

    matrix[rowIndex][colIndex] = state.circleTurn ? -1 : 1;

    // Check win
    let check;
    outer: for (let i = rowIndex - toWin + 1; i < rowIndex + 2; i++) {
      for (let j = colIndex - toWin + 1; j < colIndex + 2; j++) {
        const subMatrix = matrix
          .map((row) => row.slice(j, j + toWin))
          .slice(i, i + toWin);
        check = checkArea(subMatrix, toWin);
        if (check?.winner) {
          check.winningFields = check.winningFields.map((field) => {
            const correctedField = [];
            correctedField.push(field[0] + i);
            correctedField.push(field[1] + j);
            return correctedField;
          });

          console.log(check?.winner, check?.winningFields);
          break outer;
        }
      }
    }

    return {
      ...state,
      matrix,
      circleTurn: !state.circleTurn,
      winner: check?.winner,
      winningFields: check?.winningFields,
    };
  }

  if (type === 'RESTART') {
    console.log(state);
    const matrix = state.matrix.map((row) => row.map((field) => 0));

    return { ...state, matrix, winner: '', winningFields: [] };
  }

  if (type === 'SETTINGS') {
    return { ...initialState };
  }

  throw new Error(`No such action exists: ${type}`);
}

function checkArea(matrix, toWin) {
  let winningFields;
  let winner;

  let diagSum1 = 0;
  let diagSum2 = 0;
  const winningDiag1 = [];
  const winningDiag2 = [];

  for (let i = 0; i < toWin; i++) {
    let rowSum = 0;
    let colSum = 0;
    const winningRow = [];
    const winningCol = [];

    diagSum1 += matrix[i]?.[i] ?? 0;
    winningDiag1.push([i, i]);

    diagSum2 += matrix[i]?.[toWin - 1 - i] ?? 0;
    winningDiag2.push([i, toWin - 1 - i]);

    for (let j = 0; j < toWin; j++) {
      rowSum += matrix[i]?.[j] ?? 0;
      winningRow.push([i, j]);

      colSum += matrix[j]?.[i] ?? 0;
      winningCol.push([j, i]);

      if (Math.abs(rowSum) >= toWin) {
        winningFields = winningRow;
        winner = 'O';
        if (rowSum > 0) {
          winner = 'X';
        }
        return { winner, winningFields };
      }
      if (Math.abs(colSum) >= toWin) {
        winningFields = winningCol;
        winner = 'O';
        if (colSum > 0) {
          winner = 'X';
        }
        return { winner, winningFields };
      }

      if (Math.abs(diagSum1) >= toWin) {
        winningFields = winningDiag1;
        winner = 'O';
        if (diagSum1 > 0) {
          winner = 'X';
        }
        return { winner, winningFields };
      }
      if (Math.abs(diagSum2) >= toWin) {
        winningFields = winningDiag2;
        winner = 'O';
        if (diagSum2 > 0) {
          winner = 'X';
        }
        return { winner, winningFields };
      }
    }
  }
  return { winner, winningFields };
}
