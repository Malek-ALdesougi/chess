export function checkIfmoveAllowed(col, row, allowedMoves, isCheckMate, checkMateAllowedMoves, selectedPiece, currentSquare) {

  let allowed = false;
  let x = false;
  if (isCheckMate.black === true || isCheckMate.white === true) {


    //TODO:: !!======  NEED TO HANDEL THE DOUBLE AND SINGLE CHECK  ====== !!



    let { king, ...defendersAndEaters } = checkMateAllowedMoves;

    console.log(defendersAndEaters);

    if (selectedPiece?.type === 'king') {
      if (king.find((item) => item === col + row)) {
        allowed = true;
      }else{
        x = true ;
      }
    } 
    
      Object.keys(defendersAndEaters).map((item) => {
        if (item === selectedPiece.type + currentSquare) {
          if (defendersAndEaters[item] === col + row) {
            allowed = true;
          }else{
            x = true;
          }
        }
      });

    console.log(allowed);

    if(allowed === false && x === false){
     return alert('GG white won the game')
    }

    return allowed;
  } else {

    const result = allowedMoves.find((move) => move === col + row);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

}