export function checkIfmoveAllowed(col, row, allowedMoves) {
    console.log('from test function');
    const result = allowedMoves.find((move) => move === col + row);

    if (result) {
      return true;
    } else {
      return false;
    }
  }