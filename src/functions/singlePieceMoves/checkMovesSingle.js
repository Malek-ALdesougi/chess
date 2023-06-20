/* eslint-disable no-fallthrough */
//Moves functions
import { handleNewPosition } from "../pawnPositioning/handleMovePosition";
import { handleAttackPosition } from "../pawnPositioning/handleAttackPosition";
import { handleBishopLogic } from "../bishopPositioning/handleBishopLogic";
import { handleRookLogic } from "../rookPositioning/handleRookLogic";

//Pin functions
import { checkIfPieceRightLeftPinnedToKing } from "../pinPiecesLogic/rightLeft/checkIfPieceRightLeftPinnedToKing";
import { checkIfPieceTopDownPinnedToKing } from "../pinPiecesLogic/topDown/checkIfPieceTopDownPinnedToKing";
import { checkIfPieceDiagonallyRightPinnedToKing } from "../pinPiecesLogic/diagonal/checkIfPieceDiagonallyRightPinnedToKing";
import { checkIfPieceDiagonallyLeftPinnedToKing } from "../pinPiecesLogic/diagonal/checkIfPieceDiagonallyLeftPinnedToKing";

let allowedMoves = [];
let kingPossibleMoves = [];
let kingColor = '';


function handleKingNormalMoves(currentCol, currentRow, pieces) {

    allowedMoves = [];
    kingPossibleMoves = [];

    let enemyColor = pieces[currentCol + currentRow]?.color === 'white' ? 'black' : 'white';
    kingColor = pieces[currentCol + currentRow]?.color;

    let enemyPiecesAllowedMoves = getEachEnemyPieceAllowedMoves(pieces, enemyColor);

    kingPossibleMoves = checkKingAllowedMoves(currentCol, currentRow, pieces);

    allowedMoves = kingPossibleMoves.filter(move => !enemyPiecesAllowedMoves.includes(move) && move.length <= 2 && !move.includes('0') && !move.includes('9') && move !== currentCol + currentRow);
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
    return kingPossibleMoves;
}


function getEachEnemyPieceAllowedMoves(pieces, enemyColor) {

    let concatedArray = [];
    let chekker = 'king';

    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color === enemyColor) {

            if (pieces[sinlgePiece]?.type === 'king') {
                kingPossibleMoves = checkKingAllowedMoves(sinlgePiece[0], sinlgePiece[1], pieces)
                concatedArray = [...concatedArray, ...kingPossibleMoves]
                kingPossibleMoves = [];
            }

            if (pieces[sinlgePiece]?.type !== 'king') {
                concatedArray = [...concatedArray, ...checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces, chekker)];
            }
        }
    })
    let filteredArray = concatedArray?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    return filteredArray;
}





export function checkMovesForSinglePiece(thePiece, currentCol, currentRow, pieces, chekker) {

    switch (thePiece?.type) {
        case 'pawn':
            allowedMoves = [];
            // ============== check all available move for the white pawn at any postion ===================
            if (pieces[currentCol + handleNewPosition(currentRow, '1', thePiece.color)] === undefined) {
                if (thePiece.basePostion === true && pieces[currentCol + handleNewPosition(currentRow, '2', thePiece.color)] === undefined) {
                    if (chekker !== 'king') {
                        !checkIfPieceRightLeftPinnedToKing(thePiece, currentCol, currentRow, pieces) &&
                            !checkIfPieceDiagonallyRightPinnedToKing(thePiece, currentCol, currentRow, pieces) &&
                            !checkIfPieceDiagonallyLeftPinnedToKing(thePiece, currentCol, currentRow, pieces) ?
                            allowedMoves.push(currentCol + handleNewPosition(currentRow, '2', thePiece.color), currentCol + handleNewPosition(currentRow, '1', thePiece.color))
                            : allowedMoves = [];
                    }
                } else {

                    //to handle the pawn allowd moves if the check comes from the king move funciton
                    if (chekker !== 'king') {
                        !checkIfPieceRightLeftPinnedToKing(thePiece, currentCol, currentRow, pieces) &&
                            !checkIfPieceDiagonallyRightPinnedToKing(thePiece, currentCol, currentRow, pieces) &&
                            !checkIfPieceDiagonallyLeftPinnedToKing(thePiece, currentCol, currentRow, pieces) ?
                            allowedMoves.push(currentCol + handleNewPosition(currentRow, '1', thePiece.color)) :
                            allowedMoves = [];
                    }
                }
            }
            // check if the pawn can eat at the country levels depending on its color '''''''
            if (thePiece?.color === 'white') {

                if (chekker !== 'king') {
                    // not giving the pawn the country levesl attack if its straight pinned !!
                    if (checkIfPieceTopDownPinnedToKing(thePiece, currentCol, currentRow, pieces)) {
                        return allowedMoves;
                    }
                }

                if ((pieces[handleAttackPosition(currentCol, '1', '+') + handleAttackPosition(currentRow, '1', '+')] !== undefined &&
                    pieces[handleAttackPosition(currentCol, '1', '+') + handleAttackPosition(currentRow, '1', '+')]?.type !== 'king') ||
                    (chekker === 'king' && pieces[handleAttackPosition(currentCol, '1', '+') + handleAttackPosition(currentRow, '1', '+')]?.color !== 'white')) {
                    allowedMoves.push(!checkIfPieceDiagonallyLeftPinnedToKing(thePiece, currentCol, currentRow, pieces) ? handleAttackPosition(currentCol, '1', '+') + handleAttackPosition(currentRow, '1', '+') : '');
                }
                if ((pieces[handleAttackPosition(currentCol, '1', '-') + handleAttackPosition(currentRow, '1', '+')] !== undefined &&
                    pieces[handleAttackPosition(currentCol, '1', '-') + handleAttackPosition(currentRow, '1', '+')]?.type !== 'king') ||
                    (chekker === 'king' && pieces[handleAttackPosition(currentCol, '1', '-') + handleAttackPosition(currentRow, '1', '+')]?.color !== 'white')) {
                    allowedMoves.push(!checkIfPieceDiagonallyRightPinnedToKing(thePiece, currentCol, currentRow, pieces) ? handleAttackPosition(currentCol, '1', '-') + handleAttackPosition(currentRow, '1', '+') : '')
                }
            } else if (thePiece?.color === 'black') {

                if (chekker !== 'king') {
                    // not giving the pawn the country levesl attack if its straight pinned !!
                    if (checkIfPieceTopDownPinnedToKing(thePiece, currentCol, currentRow, pieces)) {
                        return allowedMoves;
                    }
                }

                if ((pieces[handleAttackPosition(currentCol, '1', '+') + handleAttackPosition(currentRow, '1', '-')] !== undefined &&
                    pieces[handleAttackPosition(currentCol, '1', '+') + handleAttackPosition(currentRow, '1', '-')]?.type !== 'king') ||
                    (chekker === 'king' && pieces[handleAttackPosition(currentCol, '1', '+') + handleAttackPosition(currentRow, '1', '-')]?.color !== 'black')) {
                    allowedMoves.push(!checkIfPieceDiagonallyRightPinnedToKing(thePiece, currentCol, currentRow, pieces) ? handleAttackPosition(currentCol, '1', '+') + handleAttackPosition(currentRow, '1', '-') : '');
                }
                if ((pieces[handleAttackPosition(currentCol, '1', '-') + handleAttackPosition(currentRow, '1', '-')] !== undefined &&
                    pieces[handleAttackPosition(currentCol, '1', '-') + handleAttackPosition(currentRow, '1', '-')]?.type !== 'king') ||
                    (chekker === 'king' && pieces[handleAttackPosition(currentCol, '1', '-') + handleAttackPosition(currentRow, '1', '-')]?.color !== 'black')) {
                    allowedMoves.push(!checkIfPieceDiagonallyLeftPinnedToKing(thePiece, currentCol, currentRow, pieces) ? handleAttackPosition(currentCol, '1', '-') + handleAttackPosition(currentRow, '1', '-') : '')
                }
            }
            return allowedMoves;

        case 'knight':
            allowedMoves = [];

            if (chekker !== 'king') {

                if (checkIfPieceRightLeftPinnedToKing(thePiece, currentCol, currentRow, pieces)) {
                    return allowedMoves;
                }
                if (checkIfPieceTopDownPinnedToKing(thePiece, currentCol, currentRow, pieces)) {
                    return allowedMoves;
                }
                if (checkIfPieceDiagonallyRightPinnedToKing(thePiece, currentCol, currentRow, pieces)) {
                    return allowedMoves;
                }

                if(checkIfPieceDiagonallyLeftPinnedToKing(thePiece, currentCol, currentRow, pieces)){
                    return allowedMoves;
                }
            }
            allowedMoves.push(eval(`${currentCol} + 1`) + '' + eval(`${currentRow} - 2`),
                eval(`${currentCol} - 1`) + '' + eval(`${currentRow} - 2`),
                eval(`${currentCol} + 1`) + '' + eval(`${currentRow} + 2`),
                eval(`${currentCol} - 1`) + '' + eval(`${currentRow} + 2`),
                eval(`${currentCol} + 2`) + '' + eval(`${currentRow} + 1`),
                eval(`${currentCol} + 2`) + '' + eval(`${currentRow} - 1`),
                eval(`${currentCol} - 2`) + '' + eval(`${currentRow} + 1`),
                eval(`${currentCol} - 2`) + '' + eval(`${currentRow} - 1`))
            return allowedMoves;
        case 'bishop':
            if (chekker !== 'king') {
                // fully pinn logic
                if (checkIfPieceRightLeftPinnedToKing(thePiece, currentCol, currentRow, pieces)) {
                    return allowedMoves;
                }
                if (checkIfPieceTopDownPinnedToKing(thePiece, currentCol, currentRow, pieces)) {
                    return allowedMoves;
                }
            }
            allowedMoves = [];
            return handleBishopLogic(currentCol, currentRow, pieces, thePiece);
        case 'rook':
            allowedMoves = [];
            return handleRookLogic(currentCol, currentRow, pieces, thePiece, chekker);
        case 'queen':
            allowedMoves = [];
            checkIfPieceTopDownPinnedToKing(thePiece, currentCol, currentRow, pieces) ?  allowedMoves = handleRookLogic(currentCol, currentRow, pieces, thePiece) :
            allowedMoves = handleBishopLogic(currentCol, currentRow, pieces, thePiece).concat(handleRookLogic(currentCol, currentRow, pieces, thePiece));
            let filteredAllowdMoves2 = allowedMoves.filter((move) => move.length <= 2 && !move.includes('-'));
            let fianlArray = Array.from(new Set(filteredAllowdMoves2));

            return fianlArray;
        case 'king':
            allowedMoves = [];
            return handleKingNormalMoves(currentCol, currentRow, pieces);


        default:
            return allowedMoves;
    }

}