


/* eslint-disable no-fallthrough */

function handleNewPosition(str1, str2, color) {
    let operator;
    const num1 = parseInt(str1);
    const num2 = parseInt(str2);
    let result = num1 + num2;

    // decide white operator to use
    if (color === 'white') {
        operator = '+';
    } else {
        operator = '-';
    }

    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else {
        return 'Invalid operator';
    }

    return result.toString();
}

function handleNewPositionTwo(str1, str2, operator) {

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
            // ============== check all available move for the white pawn at any postion ===================
            if (pieces[currentCol + handleNewPosition(currentRow, '1', thePiece.color)] === undefined) {
                if (thePiece.basePostion === true) {
                    allowedMoves.push(currentCol + handleNewPosition(currentRow, '2', thePiece.color),
                        currentCol + handleNewPosition(currentRow, '1', thePiece.color))
                    pieces[currentCol + currentRow].basePostion = false;
                } else {
                    allowedMoves.push(currentCol + handleNewPosition(currentRow, '1', thePiece.color))
                }
            }
            // check if the pawn can eat at the country levels depending on its color '''''''
            if (thePiece?.color === 'white') {

                if (pieces[handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '+')]?.color === 'black') {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '+'));
                }
                if (pieces[handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '+')]?.color === 'black') {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '+'))
                }
            }else if(thePiece?.color === 'black'){

                if (pieces[handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '-')]?.color === 'white') {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '-'));
                }
                if (pieces[handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '-')]?.color === 'white') {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '-'))
                }
            }
                return allowedMoves;

        // ============== check all available move for the white pawn at any postion ===================

        case 'knight':

        default:
            return allowedMoves;
    }
}