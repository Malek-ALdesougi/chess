export function checkIfPawnCanPromot(futureSquare, setCouldBePromoted, pieces, setPlayerTurn){

    let rowNumber;
    
    if(pieces[futureSquare]?.color === 'white'){
      rowNumber = futureSquare[1];
      if(rowNumber === '8'){
        setPlayerTurn(true)
        setCouldBePromoted(true);
        return true;
      }
    }else if(pieces[futureSquare]?.color === 'black'){
      rowNumber = futureSquare[1];
      if(rowNumber === '1'){
        setPlayerTurn(false);
        setCouldBePromoted(true);
        return true;
      }
    }else{
        setCouldBePromoted(false);
        return false;
    }

  }