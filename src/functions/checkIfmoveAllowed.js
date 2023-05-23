export function checkIfmoveAllowed(col, row, allowedMoves, checkMateAllowedMoves) {


    //TODO: THE ALLOWED MOVES COULD BE AN ARRAY IN THE NORMAL SETUATION
    //TODO: OR IT COULD BE AN OBJECT WITH KEYS FOR EACH AVAILABLE MOVE FOR EACH PIECE (EAT, BLOCK, ESCAPE)


    console.log('from test function');
    const result = allowedMoves.find((move) => move === col + row);

    if (result) {
      return true;
    } else {
      return false;
    }
  }