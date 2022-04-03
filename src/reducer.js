export default function reducer(state, action) {
  const { type, payload } = action;

  if (type === 'start') {
    const { size, toWin, circleStarts } = payload;
    const matrix = [];

    for (let i = 0; i < size; i++) {
      const row = [];

      for (let j = 0; j < size; j++) {
        row.push(0);
      }

      matrix.push(row);
    }

    return { ...state, toWin, circleStarts, inProgress: true, matrix, size };
  }

  console.error('Not such action exists...');
  return state;
}
