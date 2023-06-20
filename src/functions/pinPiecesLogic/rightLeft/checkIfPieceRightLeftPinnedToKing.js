
export function checkIfPieceRightLeftPinnedToKing(thePiece, currentCol, currentRow, pieces) {

    let kingProtector = false;
    let kingAttacker = false;

    let numberCol = parseInt(currentCol);

    // Check the first piece from the right
    for (let i = numberCol + 1; i <= 8; i++) {
        if (pieces[i + currentRow] !== undefined) {
            if (pieces[i + currentRow]?.type === 'king' && pieces[i + currentRow]?.color === thePiece?.color) {
                kingProtector = true;
            }
            break;
        }
    }
    // Check the first piece from the left
    for (let i = numberCol - 1; i >= 1; i--) {
        if (pieces[i + currentRow] !== undefined) {
            if ((pieces[i + currentRow]?.type === 'queen' || pieces[i + currentRow]?.type === 'rook') &&
                pieces[i + currentRow]?.color !== thePiece?.color) {
                kingAttacker = true;
            }
            break;
        }
    }

    for (let i = numberCol + 1; i <= 8; i++) {
        if (pieces[i + currentRow] !== undefined) {
            if ((pieces[i + currentRow]?.type === 'queen' || pieces[i + currentRow]?.type === 'rook') &&
                pieces[i + currentRow]?.color !== thePiece?.color) {
                kingAttacker = true;
            }
            break;
        }
    }


    for (let i = numberCol - 1; i >= 1; i--) {
        if (pieces[i + currentRow] !== undefined) {
            if (pieces[i + currentRow]?.type === 'king' && pieces[i + currentRow]?.color === thePiece?.color) {
                kingProtector = true;
            }
            break;
        }
    }


    if (kingProtector && kingAttacker) {
        return true;
    } else {
        return false
    }


}
