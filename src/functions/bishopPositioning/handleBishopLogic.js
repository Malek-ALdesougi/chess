//functions
import { bishopNewPositionUpLeftDownRight } from "./bishopNewPositionUpLeftDownRight";
import { bishopNewPositionUpRightDownLeft } from "./bishopNewPositionUpRightDownLeft";

export function handleBishopLogic(currentCol, currentRow, pieces, thePiece) {
    // first thing check if the right and left position are empty or friend or enemy;
    let allowedMoves = [];
    let flagA = true;
    let flagB = true;
    let flagC = true;
    let flagD = true;
    for (let i = 1; i <= 8; i++) {

        if (flagA) {

            if((pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)]?.type === 'king' && 
            pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)]?.color !== thePiece?.color)){
                flagA = false;
            }

            if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)] !== undefined) {
                allowedMoves.push(bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i))
                flagA = false;
            }

            if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i)] === undefined) {
                allowedMoves.push(bishopNewPositionUpRightDownLeft(currentCol, currentRow, '+', i))
            }
        }

        if (flagB) {

            if((pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)]?.type === 'king' &&
            pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)]?.color !== thePiece?.color)){
                flagB = false;
            }

            if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)] !== undefined) {
                allowedMoves.push(bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i))
                flagB = false;
            }

            if (pieces[bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i)] === undefined) {
                allowedMoves.push(bishopNewPositionUpRightDownLeft(currentCol, currentRow, '-', i))
            }
        }

        //handle UP-LEFT && DOWN-RIGHT DIRECTIONS
        if (flagC) {

            if((pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)]?.type === 'king' &&
            pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)]?.color !== thePiece?.color)){
                flagC = false;
            }

            if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)] !== undefined) {
                allowedMoves.push(bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i))
                flagC = false;
            }

            if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i)] === undefined) {
                allowedMoves.push(bishopNewPositionUpLeftDownRight(currentCol, '-', currentRow, '+', i))
            }
        }

        if (flagD) {

            if((pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)]?.type === 'king' &&
            pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)]?.color !== thePiece?.color)){
                flagD = false;
            }

            if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)] !== undefined) {
                allowedMoves.push(bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i))
                flagD = false;
            }

            if (pieces[bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i)] === undefined) {
                allowedMoves.push(bishopNewPositionUpLeftDownRight(currentCol, '+', currentRow, '-', i))
            }
        }
    }

    const filterdAllowedMoves = allowedMoves.filter((move) => move.length < 3 && !move.includes('-'))

    return filterdAllowedMoves;


}