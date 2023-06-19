export function checkIfmoveAllowed(col, row, allowedMoves, isCheckMate, checkMateAllowedMoves, selectedPiece, currentSquare) {

  let allowed = false;
  let x = false;

  console.log('iuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');

  console.log(checkMateAllowedMoves);

  console.log(selectedPiece);
  // console.log(currentSquare);

  if (isCheckMate.black === true || isCheckMate.white === true) {


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
        console.log(defendersAndEaters[item]);
        if(Array.isArray(defendersAndEaters[item])){
          if(col + row === defendersAndEaters[item][0] || col + row === defendersAndEaters[item][1]){
          console.log('its an array means that its eater and defender');
          return allowed = true;
        }else{
          return x = true;
        }
      }else{

          console.log(selectedPiece.type + currentSquare);


          if (item === selectedPiece.type + currentSquare) {
            if (defendersAndEaters[item] === col + row) {
              allowed = true;
            }else{
              x = true;
            }
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