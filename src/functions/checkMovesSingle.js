/* eslint-disable no-fallthrough */


let allowedMoves = [];
let kingPossibleMoves = [];
let kingColor = '';
let kingFrontSquare = '';




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


function rookNewPosition(columnOrRow, operator, value) {
    let corlOrRowNub = parseInt(columnOrRow);
    let result;

    if (operator === '+') {
        result = corlOrRowNub + value;
    } else if (operator === '-') {
        result = corlOrRowNub - value;
    }
    return result.toString();

}


function handleBishopLogic(currentCol, currentRow, pieces, thePiece) {
    // first thing check if the right and left position are empty or friend or enemy;
    let flagA = true;
    let flagB = true;
    let flagC = true;
    let flagD = true;
    for (let i = 1; i <= 8; i++) {

        if (flagA) {
            if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)] !== undefined) {
                flagA = false;
            }

            if ((pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)] === undefined ||
                pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)]?.color !== thePiece.color)) {
                allowedMoves.push(bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i))
            }
        }

        if (flagB) {

            if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)] !== undefined) {
                flagB = false;
            }

            if ((pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)] === undefined ||
                pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)]?.color !== thePiece.color)) {
                allowedMoves.push(bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i))
            }
        }

        //handle UP-LEFT && DOWN-RIGHT DIRECTIONS
        if (flagC) {

            if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)] !== undefined) {
                flagC = false;
            }

            if ((pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)] === undefined ||
                pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)]?.color !== thePiece.color)) {
                allowedMoves.push(bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i))
            }
        }

        if (flagD) {

            if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)] !== undefined) {
                flagD = false;
            }

            if ((pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)] === undefined ||
                pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)]?.color !== thePiece.color)) {
                allowedMoves.push(bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i))
            }
        }
    }

    const filterdAllowedMoves = allowedMoves.filter((move) => move.length < 3 && !move.includes('-'))

    return filterdAllowedMoves;


}


function handleRookLogic(currentCol, currentRow, pieces, thePiece) {
    // maximum squares the rook can move to up-down-right-left is 8 
    //check the available moves within all directions
    let flagUp = true;
    let flagDown = true;
    let flagRight = true;
    let flagLeft = true;

    for (let i = 1; i <= 8; i++) {

        // up
        if (flagUp) {

            if (pieces[currentCol + rookNewPosition(currentRow, '+', i)] === undefined) {
                allowedMoves.push(currentCol + rookNewPosition(currentRow, '+', i))
            } else if (pieces[currentCol + rookNewPosition(currentRow, '+', i)]?.color !== thePiece.color || pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.color === thePiece.color) {
                allowedMoves.push(currentCol + rookNewPosition(currentRow, '+', i))
                flagUp = false;
            } else { flagUp = false }
        }

        // down
        if (flagDown) {

            if (pieces[currentCol + rookNewPosition(currentRow, '-', i)] === undefined ) {
                allowedMoves.push(currentCol + rookNewPosition(currentRow, '-', i))
            } else if (pieces[currentCol + rookNewPosition(currentRow, '-', i)]?.color !== thePiece.color || pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.color === thePiece.color) {
                allowedMoves.push(currentCol + rookNewPosition(currentRow, '-', i))
                flagDown = false;
            } else { flagDown = false }
        }

        // right
        if (flagRight) {

            if (pieces[rookNewPosition(currentCol, '+', i) + currentRow] === undefined ) {
                allowedMoves.push(rookNewPosition(currentCol, '+', i) + currentRow)
            } else if (pieces[rookNewPosition(currentCol, '+', i) + currentRow]?.color !== thePiece.color || pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.color === thePiece.color) {
                allowedMoves.push(rookNewPosition(currentCol, '+', i) + currentRow)
                flagRight = false;
            }
            else { flagRight = false }
        }

        // left
        if (flagLeft) {

            if (pieces[rookNewPosition(currentCol, '-', i) + currentRow] === undefined ) {
                allowedMoves.push(rookNewPosition(currentCol, '-', i) + currentRow)
            } else if (pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.color !== thePiece.color || pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.color === thePiece.color) {
                allowedMoves.push(rookNewPosition(currentCol, '-', i) + currentRow)
                flagLeft = false;
            } else { flagLeft = false }
        }

    }
    return allowedMoves;
}

function handleKingNormalMoves(currentCol, currentRow, pieces) {
    allowedMoves = [];
    kingPossibleMoves = [];

    let enemyColor = pieces[currentCol + currentRow]?.color === 'white' ? 'black' : 'white';
    kingColor = pieces[currentCol + currentRow]?.color;

    let enemyPiecesAllowedMoves = getEachEnemyPieceAllowedMoves(pieces, enemyColor);

    kingPossibleMoves = checkKingAllowedMoves(currentCol, currentRow, pieces);

    allowedMoves = kingPossibleMoves.filter(move => !enemyPiecesAllowedMoves.includes(move) && move.length <= 2 && !move.includes('0') && !move.includes('9'));

    //becuase the king front square is from the allowed moves to the pawn;
    allowedMoves.push(kingFrontSquare);
    return allowedMoves;
}


function checkKingAllowedMoves(col, row, pieces) {

    //check the safty for THE EACH possible square for all direction around it
    let colNum = parseInt(col);
    let rowNum = parseInt(row);
    let possibleSquare;

    if (pieces) {

        for (let i = 1; i <= 8; i++) {
            colNum = parseInt(col);
            rowNum = parseInt(row);
            switch (i) {
                //
                case 1: possibleSquare = col + (rowNum + 1).toString();
                    if (pieces[possibleSquare]?.color !== kingColor) {
                        kingFrontSquare = possibleSquare;
                        kingPossibleMoves.push(possibleSquare);
                    }
                    break;

                case 2: possibleSquare = colNum.toString() + (rowNum - 1).toString();
                    if (pieces[possibleSquare]?.color !== kingColor) {

                        kingPossibleMoves.push(possibleSquare);
                    }
                    break;

                case 3: possibleSquare = (colNum - 1).toString() + rowNum;
                    if (pieces[possibleSquare]?.color !== kingColor) {

                        kingPossibleMoves.push(possibleSquare);
                    }
                    break;

                    //
                case 4: possibleSquare = (colNum + 1).toString() + rowNum;
                    if (pieces[possibleSquare]?.color !== kingColor) {

                        kingPossibleMoves.push(possibleSquare);
                    }
                    break;

                    //
                case 5: possibleSquare = (colNum - 1).toString() + (rowNum + 1).toString();
                    if (pieces[possibleSquare]?.color !== kingColor) {
                        console.log('up right added !!');
                        kingPossibleMoves.push(possibleSquare);
                    }
                    break;

                case 6: possibleSquare = (colNum + 1).toString() + (rowNum - 1).toString();
                    if (pieces[possibleSquare]?.color !== kingColor) {

                        kingPossibleMoves.push(possibleSquare);
                    }
                    break;

                case 7: possibleSquare = (colNum + 1).toString() + (rowNum + 1).toString();
                    if (pieces[possibleSquare]?.color !== kingColor) {

                        kingPossibleMoves.push(possibleSquare);
                    }
                    break;

                    //
                case 8: possibleSquare = (colNum - 1).toString() + (rowNum - 1).toString();
                    if (pieces[possibleSquare]?.color !== kingColor) {

                        kingPossibleMoves.push(possibleSquare);
                    }
                    break;

                default: return kingPossibleMoves;
            }
        }
    }

    console.log(kingPossibleMoves);

    return kingPossibleMoves;
}


function getEachEnemyPieceAllowedMoves(pieces, enemyColor) {

    let concatedArray = [];
    let pawn = 'pawn';

    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color === enemyColor) {

            if (pieces[sinlgePiece]?.type === 'king') {
                kingPossibleMoves = checkKingAllowedMoves(sinlgePiece[0], sinlgePiece[1], pieces)
                concatedArray = [...concatedArray, ...kingPossibleMoves]
                kingPossibleMoves = [];
            }

            if (pieces[sinlgePiece]?.type !== 'king') {
                concatedArray = [...concatedArray, ...checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces, pawn)];
            }
        }
    })
    let filteredArray = concatedArray?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    return filteredArray;
}

export function checkMovesForSinglePiece(thePiece, currentCol, currentRow, pieces, pawn) {

    switch (thePiece?.type) {
        case 'pawn':
            allowedMoves = [];
            // ============== check all available move for the white pawn at any postion ===================
            if (pieces[currentCol + handleNewPosition(currentRow, '1', thePiece.color)] === undefined) {
                if (thePiece.basePostion === true && pieces[currentCol + handleNewPosition(currentRow, '2', thePiece.color)] === undefined) {
                    allowedMoves.push(currentCol + handleNewPosition(currentRow, '2', thePiece.color),
                        currentCol + handleNewPosition(currentRow, '1', thePiece.color))
                    // pieces[currentCol + currentRow].basePostion = false;
                } else {
                    allowedMoves.push(currentCol + handleNewPosition(currentRow, '1', thePiece.color))
                }
            }
            // check if the pawn can eat at the country levels depending on its color '''''''
            if (thePiece?.color === 'white') {

                if (pawn === 'pawn') {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '+'));
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '+'))
                }

                if (pieces[handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '+')] !== undefined) {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '+'));
                }
                if (pieces[handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '+')] !== undefined) {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '+'))
                }
            } else if (thePiece?.color === 'black') {

                if (pawn === 'pawn') {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '-'));
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '-'))
                }

                if (pieces[handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '-')] !== undefined) {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '+') + handleNewPositionTwo(currentRow, '1', '-'));
                }
                if (pieces[handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '-')] !== undefined) {
                    allowedMoves.push(handleNewPositionTwo(currentCol, '1', '-') + handleNewPositionTwo(currentRow, '1', '-'))
                }
            }
            return allowedMoves;

        case 'knight':
            allowedMoves = [];
            allowedMoves.push(eval(`${currentCol} + 1`) + '' + eval(`${currentRow} - 2`),
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
        // chain the bishop moves with
        case 'bishop':
            allowedMoves = [];
            return handleBishopLogic(currentCol, currentRow, pieces, thePiece);
        case 'rook':
            allowedMoves = [];
            return handleRookLogic(currentCol, currentRow, pieces, thePiece);
        case 'queen':
            allowedMoves = [];
            allowedMoves = handleBishopLogic(currentCol, currentRow, pieces, thePiece).concat(handleRookLogic(currentCol, currentRow, pieces, thePiece));
            let filteredAllowdMoves2 = allowedMoves.filter((move) => move.length <= 2 && !move.includes('-'));
            return filteredAllowdMoves2;
        case 'king':
            // console.log('start king');
            allowedMoves = [];
            return handleKingNormalMoves(currentCol, currentRow, pieces);


        default:
            return allowedMoves;
    }
}