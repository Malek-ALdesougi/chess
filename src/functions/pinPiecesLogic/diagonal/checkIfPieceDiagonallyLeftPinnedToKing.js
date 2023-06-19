export function checkIfPieceDiagonallyLeftPinnedToKing(thePiece, currentCol, currentRow, pieces) {

    let kingProtector = false;
    let kingAttacker = false;

    let numberCol = parseInt(currentCol);
    let numberRow = parseInt(currentRow);

    for (let i = numberCol - 1, x = numberRow + 1; i >= 1 && x <= 8; i--, x++) {

        if (pieces[i.toString() + x.toString()] !== undefined) {
            if ((pieces[i.toString() + x.toString()]?.type === 'queen' || pieces[i.toString() + x.toString()]?.type === 'bishop')
                && pieces[i.toString() + x.toString()]?.color !== thePiece?.color) {
                console.log('attacker left-Top found');
                kingAttacker = true;
            }
            break;
        }
    }

    for (let i = numberCol + 1, x = numberRow - 1; i <= 8 && x >= 1; i++, x--) {

        if (pieces[i.toString() + x.toString()] !== undefined) {
            if (pieces[i.toString() + x.toString()]?.type === 'king' && pieces[i.toString() + x.toString()]?.color === thePiece?.color) {
                console.log('king right-bottom found');
                kingProtector = true;
            }
            break;
        }
    }

    for (let i = numberCol - 1, x = numberRow + 1; i >= 1 && x <= 8; i--, x++) {

        if (pieces[i.toString() + x.toString()] !== undefined) {
            if (pieces[i.toString() + x.toString()]?.type === 'king' && pieces[i.toString() + x.toString()]?.color === thePiece?.color) {
                console.log('king left-Top found');
                kingProtector = true;
            }
            break;
        }
    }

    for (let i = numberCol + 1, x = numberRow - 1; i <= 8 && x >= 1; i++, x--) {

        if (pieces[i.toString() + x.toString()] !== undefined) {
            if ((pieces[i.toString() + x.toString()]?.type === 'queen' || pieces[i.toString() + x.toString()]?.type === 'bishop')
                && pieces[i.toString() + x.toString()]?.color !== thePiece?.color) {
                console.log('attacker right-bottom found');
                kingAttacker = true;
            }
            break;
        }
    }


    if(kingAttacker && kingProtector){
        return true;
    }else{
        return false;
    }

}
