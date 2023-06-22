import { checkPlayerTurn } from "../playerTurn/checkPlayerTurn";

export function checkIfmoveAllowed(col, row, allowedMoves, isCheckMate, checkMateAllowedMoves, selectedPiece, currentSquare,playerTurn, pieces) {

  let allowed = false;
  let x = false;

  // checkPlayerTurn(col, row, playerTurn, pieces);

  if (isCheckMate.black === true || isCheckMate.white === true) {


    let { king, ...defendersAndEaters } = checkMateAllowedMoves;


    if (selectedPiece?.type === 'king') {
      if (king.find((item) => item === col + row)) {
        allowed = true;
      }else{
        x = false ;
      }
    } 

    
      Object.keys(defendersAndEaters).map((item) => {
        if(Array.isArray(defendersAndEaters[item])){
          if(col + row === defendersAndEaters[item][0] || col + row === defendersAndEaters[item][1]){
          return allowed = true;
        }else{
          return x = false;
        }
      }else{

          if (item === selectedPiece.type + currentSquare) {
            if (defendersAndEaters[item] === col + row) {
              allowed = true;
            }else{
              x = false;
            }
          }
        }
      });
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