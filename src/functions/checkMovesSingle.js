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


function bishopNewPositionUpRightDownLeft(col, row, operator, increaseValue) {
    const num1 = parseInt(col);
    const num2 = parseInt(row);
    let newCol;
    let newRow;
    let result;

    if (operator === '+') {
        newCol = (num1 + increaseValue);
        newRow = (num2 + increaseValue);
        result = newCol.toString() + newRow.toString();
        return result;
    } else if (operator === '-') {
        newCol = num1 - increaseValue;
        newRow = num2 - increaseValue;
        result = newCol.toString() + newRow.toString();
        return result;
    }

}

function bishopNewPositionUpLeftDownRight(col, operatorOne, row, operatorTwo, increaseValue) {
    let num1 = parseInt(col);
    let num2 = parseInt(row);
    let newCol;
    let newRow;
    let result;

    if (operatorOne === '+') {
        newCol = num1 + increaseValue;
        newRow = num2 - increaseValue;
        result = newCol.toString() + newRow.toString();
        return result;
    } else {
        newCol = num1 - increaseValue;
        newRow = num2 + increaseValue;
        result = newCol.toString() + newRow.toString();
        return result;
    }
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
        case 'bishop':
            allowedMoves = [];
            // first thing check if the right and left position are empty or friend or enemy;

            //check the UP-RIGHT DIRECTION
            // MAXIMUM UP-RIGHT SQUARES THE BISHOP CAN MOVE IS ''7''
            let flagA = true;
            let flagB = true;
            let flagC = true;
            let flagD = true;

            for (let i = 1; i <= 8; i++) {

                //handle UP-RIGHT && DOWN-LEFT DIRECTIONS
                if (flagA) {
                    if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)] !== undefined) {
                        flagA = false;
                    }

                    if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)] === undefined ||
                        pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)]?.color !== thePiece.color) {
                        allowedMoves.push(bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i))
                    }
                }

                if (flagB) {

                    if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)] !== undefined) {
                        flagB = false;
                    }

                    if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)] === undefined ||
                        pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)]?.color !== thePiece.color) {
                        allowedMoves.push(bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i))
                    }
                }

                if (flagC) {

                    if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)] !== undefined) {
                        flagC = false;
                    }

                    //handle UP-LEFT && DOWN-RIGHT DIRECTIONS
                    if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)] === undefined ||
                        pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)]?.color !== thePiece.color) {
                        allowedMoves.push(bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i))
                    }
                }

                if (flagD) {

                    if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)] !== undefined) {
                        flagD = false;
                    }

                    if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)] === undefined ||
                        pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)]?.color !== thePiece.color) {
                        allowedMoves.push(bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i))
                    }
                }

            }
            return allowedMoves;


        // if (pieces[handleNewPositionBishop(currentCol, currentRow, '+', 1)] === undefined) {
        //     console.log('your way is green 1');
        //     if (pieces[handleNewPositionBishop(currentCol, currentRow, '+', 2)] === undefined) {
        //         console.log('your way is green 2');
        //     }

        // } else {
        //     console.log('its blocked');
        // }



        default:
            return allowedMoves;
    }
}