export default function reducer(state, action) {
  switch (action.type) {
    case 'start':
      const { size, toWin, circleStarts } = action.payload;
      let matrix = [];

      for (let i = 0; i < size; i++) {
        let row = [];

        for (let j = 0; j < size; j++) {
          row.push(0);
        }

        matrix.push(row);
      }

      return { ...state, toWin, circleStarts, inProgress: true, matrix };

    default:
      console.error('Not such action exists...');
      return state;
  }
}
