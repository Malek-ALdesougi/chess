/* eslint-disable no-fallthrough */






function handleOperations(str1, str2, operator) {
    const num1 = parseInt(str1);
    const num2 = parseInt(str2);
    let result = num1 + num2;

    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else {
        return 'Invalid operator';
    }

    return result.toString();
}

export function checkMovesForSinglePiece(thePiece, currentCol, currentRow, pieces) {

    const allowedMoves = [];
    switch (thePiece?.type) {
        case 'pawn':
            if (thePiece.color === 'white') {
                // ============== check all available move for the white pawn at any postion ===================
                if (pieces[currentCol + handleOperations(currentRow, '1', '+')] === undefined) {
                    if (thePiece.basePostion === true) {
                        allowedMoves.push(currentCol + handleOperations(currentRow, '2', '+'),
                            currentCol + handleOperations(currentRow, '1', '+'))
                        pieces[currentCol + currentRow].basePostion = false;
                    } else {
                        allowedMoves.push(currentCol + handleOperations(currentRow, '1', '+'))
                    }
                }

                // check if the pawn can eat at the country levels 
                if (pieces[handleOperations(currentCol, '1', '+') + handleOperations(currentRow, '1', '+')]?.color === 'black') {
                    allowedMoves.push(handleOperations(currentCol, '1', '+') + handleOperations(currentRow, '1', '+'));
                }
                if (pieces[handleOperations(currentCol, '1', '-') + handleOperations(currentRow, '1', '+')]?.color === 'black') {
                    allowedMoves.push(handleOperations(currentCol, '1', '-') + handleOperations(currentRow, '1', '+'))
                }

                return allowedMoves;
            } else {
                console.log('black pawn');
            }
        // ============== check all available move for the white pawn at any postion ===================


        default:
            return allowedMoves;
    }
}