//functions
import { checkIfPieceTopDownPinnedToKing } from "../pinPiecesLogic/topDown/checkIfPieceTopDownPinnedToKing";
import { checkIfPieceRightLeftPinnedToKing } from "../pinPiecesLogic/rightLeft/checkIfPieceRightLeftPinnedToKing";
import { rookNewPosition } from "./rookNewPosition";
import { checkIfPieceDiagonallyRightPinnedToKing } from "../pinPiecesLogic/diagonal/checkIfPieceDiagonallyRightPinnedToKing";
import { checkIfPieceDiagonallyLeftPinnedToKing } from "../pinPiecesLogic/diagonal/checkIfPieceDiagonallyLeftPinnedToKing";


export function handleRookLogic(currentCol, currentRow, pieces, thePiece, chekker) {
    // maximum squares the rook can move to up-down-right-left is 8 
    //check the available moves within all directions
    let allowedMoves = [];
    let flagUp = true;
    let flagDown = true;
    let flagRight = true;
    let flagLeft = true;

    for (let i = 1; i <= 8; i++) {

        if(checkIfPieceDiagonallyRightPinnedToKing(thePiece, currentCol, currentRow, pieces)){
            return allowedMoves ;
        }

        if(checkIfPieceDiagonallyLeftPinnedToKing(thePiece, currentCol, currentRow, pieces)){
            return allowedMoves;
        }

        // up
        if (flagUp) {

            if (!checkIfPieceRightLeftPinnedToKing(thePiece, currentCol, currentRow, pieces)) {

                if (pieces[currentCol + rookNewPosition(currentRow, '+', i)] === undefined) {
                    allowedMoves.push(currentCol + rookNewPosition(currentRow, '+', i))

                } else if (pieces[currentCol + rookNewPosition(currentRow, '+', i)]?.type === 'king' && pieces[currentCol + rookNewPosition(currentRow, '+', i)]?.color !== thePiece.color) {
                    allowedMoves.push(currentCol + rookNewPosition(currentRow, '+', i))
                    flagUp = false;
                }
                else if (pieces[currentCol + rookNewPosition(currentRow, '+', i)] !== undefined && pieces[currentCol + rookNewPosition(currentRow, '+', i)].type !== 'king') {
                    allowedMoves.push(currentCol + rookNewPosition(currentRow, '+', i))
                    flagUp = false;
                } else { flagUp = false }
            }

        }

        // down
        if (flagDown) {

            if (!checkIfPieceRightLeftPinnedToKing(thePiece, currentCol, currentRow, pieces)) {

                if (pieces[currentCol + rookNewPosition(currentRow, '-', i)] === undefined) {
                    allowedMoves.push(currentCol + rookNewPosition(currentRow, '-', i))
                }
                else if (pieces[currentCol + rookNewPosition(currentRow, '-', i)]?.type === 'king' && pieces[currentCol + rookNewPosition(currentRow, '-', i)]?.color !== thePiece.color) {
                    allowedMoves.push(currentCol + rookNewPosition(currentRow, '-', i))
                    flagDown = false;
                }
                else if (pieces[currentCol + rookNewPosition(currentRow, '-', i)]?.color !== undefined && pieces[currentCol + rookNewPosition(currentRow, '-', i)]?.type !== 'king') {
                    allowedMoves.push(currentCol + rookNewPosition(currentRow, '-', i))
                    flagDown = false;
                } else { flagDown = false }
            }

        }

        // right
        if (flagRight) {

            if (!checkIfPieceTopDownPinnedToKing(thePiece, currentCol, currentRow, pieces)) {

                if (pieces[rookNewPosition(currentCol, '+', i) + currentRow] === undefined) {
                    allowedMoves.push(rookNewPosition(currentCol, '+', i) + currentRow)
                }

                else if (pieces[rookNewPosition(currentCol, '+', i) + currentRow]?.type === 'king' && pieces[rookNewPosition(currentCol, '+', i) + currentRow]?.color !== thePiece.color) {
                    allowedMoves.push(rookNewPosition(currentCol, '+', i) + currentRow)
                    flagRight = false;
                }

                else if (pieces[rookNewPosition(currentCol, '+', i) + currentRow]?.color !== undefined && pieces[rookNewPosition(currentCol, '+', i) + currentRow]?.type !== 'king') {
                    allowedMoves.push(rookNewPosition(currentCol, '+', i) + currentRow)
                    flagRight = false;
                }
                else { flagRight = false }
            }
        }

        // left
        if (flagLeft) {

            if (!checkIfPieceTopDownPinnedToKing(thePiece, currentCol, currentRow, pieces)) {

                if (pieces[rookNewPosition(currentCol, '-', i) + currentRow] === undefined) {
                    allowedMoves.push(rookNewPosition(currentCol, '-', i) + currentRow)
                }

                else if (pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.type === 'king' && pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.color !== thePiece.color) {
                    allowedMoves.push(rookNewPosition(currentCol, '-', i) + currentRow)
                    flagLeft = false;
                }

                else if (pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.color !== undefined && pieces[rookNewPosition(currentCol, '-', i) + currentRow]?.type !== 'king') {
                    allowedMoves.push(rookNewPosition(currentCol, '-', i) + currentRow)
                    flagLeft = false;
                } else { flagLeft = false }
            }
        }

    }
    return allowedMoves;
}