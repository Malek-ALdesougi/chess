/* eslint-disable no-fallthrough */


let allowedMoves = [];


function handleNewPosition(col, row, color) {
    let operator;
    const num1 = parseInt(col);
    const num2 = parseInt(row);
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

function handleNewPositionTwo(col, row, operator) {

    const num1 = parseInt(col);
    const num2 = parseInt(row);
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

    switch (thePiece?.type) {
        case 'pawn':
            allowedMoves = [];
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
            } else if (thePiece?.color === 'black') {

                if (pieces[handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '-')]?.color === 'white') {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '-'));
                }
                if (pieces[handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '-')]?.color === 'white') {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '-'))
                }
            }
            return allowedMoves;

        case 'knight':
            allowedMoves = [];
            allowedMoves.push(eval(`${currentCol} + 8`) + '' + eval(`${currentRow} - 2`),
                eval(`${currentCol} - 1`) + '' + eval(`${currentRow} - 2`),
                eval(`${currentCol} + 1`) + '' + eval(`${currentRow} + 2`),
                eval(`${currentCol} - 1`) + '' + eval(`${currentRow} + 2`),
                eval(`${currentCol} + 2`) + '' + eval(`${currentRow} + 1`),
                eval(`${currentCol} + 2`) + '' + eval(`${currentRow} - 1`),
                eval(`${currentCol} - 2`) + '' + eval(`${currentRow} + 1`),
                eval(`${currentCol} - 2`) + '' + eval(`${currentRow} - 1`))

            // check if the piece is friend pice to remove from the allowed moves
            let filterdAllowedMoves = allowedMoves.filter((move) => pieces[move]?.color !== thePiece.color)
            return filterdAllowedMoves;
            case 'bishop' : 
            allowedMoves = [];
            // first thing check if the right and left position are empty or friend or enemy;
            // if()



        default:
            return allowedMoves;
    }
}