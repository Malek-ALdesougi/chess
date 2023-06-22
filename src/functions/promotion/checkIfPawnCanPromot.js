export function checkIfPawnCanPromot(futureSquare, setCouldBePromoted, pieces, couldBePromoted){

    let rowNumber;
    
    if(pieces[futureSquare]?.color === 'white'){
      rowNumber = futureSquare[1];
      if(rowNumber === '8'){
        console.log('this white pawn can be promoted');
        setCouldBePromoted(true);
        return true;
      }
    }else if(pieces[futureSquare]?.color === 'black'){
      rowNumber = futureSquare[1];
      if(rowNumber === '1'){
        console.log('this black pawn can be promoted');
        setCouldBePromoted(true);
        return true;
      }
    }else{
        setCouldBePromoted(false);
        return false;
    }

  }