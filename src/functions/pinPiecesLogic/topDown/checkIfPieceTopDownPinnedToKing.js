export function checkIfPieceTopDownPinnedToKing(thePiece, currentCol, currentRow, pieces) {
    let kingProtector = false;
    let kingAttacker = false;
    let numberRow = parseInt(currentRow);

    if (thePiece?.color === 'white') {

        // Check the first piece from the top
        for (let i = numberRow - 1; i >= 1; i--) {
            if (pieces[currentCol + i] !== undefined) {
                if (pieces[currentCol + i]?.type === 'king' && pieces[currentCol + i]?.color === 'white') {
                    kingProtector = true;
                }
                break;
            }
        }

        // Check the first piece from the bottom
        for (let i = numberRow + 1; i <= 8; i++) {
            if (pieces[currentCol + i] !== undefined) {
                if ((pieces[currentCol + i]?.type === 'rook' || pieces[currentCol + i]?.type === 'queen') &&
                pieces[currentCol + i]?.color !== thePiece?.color) {
                    kingAttacker = true;
                }
                break; 
            }
        }
    } else if (thePiece?.color === 'black') {
        // Check the first piece from the bottom
        for (let i = numberRow + 1; i <= 8; i++) {
            if (pieces[currentCol + i] !== undefined) {
                if (pieces[currentCol + i]?.type === 'king' && pieces[currentCol + i]?.color === 'black') {
                    kingProtector = true;
                }
                break; 
            }
        }

        // Check the first piece from the top
        for (let i = numberRow - 1; i >= 1; i--) {
            if (pieces[currentCol + i] !== undefined) {
                if ((pieces[currentCol + i]?.type === 'rook' || pieces[currentCol + i]?.type === 'queen')
                && pieces[currentCol + i]?.color !== thePiece?.color) {
                    kingAttacker = true;
                }
                break; 
            }
        }

    }

    if (kingProtector && kingAttacker) {
        return true;
    } else {
        return false;
    }
}