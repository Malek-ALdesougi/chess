// Reuse checkMovesForSinglePiece
import { checkMovesForSinglePiece } from "./checkMovesSingle";


const checkMateAllowedMoves = {};
let kingPossibleMoves = [];
let kingAllowedMoves = [];

function checkKingAllowedMoves(col, row) {

    //check the safty for THE EACH possible square for all direction around it
    let colNum = parseInt(col);
    let rowNum = parseInt(row);
    let possibleSquare;

    for (let i = 1; i <= 8; i++) {
        switch (i) {
            case 1:
                possibleSquare = colNum + (rowNum + 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 2: possibleSquare = colNum + (rowNum - 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 3: possibleSquare = (colNum - 1).toString() + rowNum;
                kingPossibleMoves.push(possibleSquare);
                break;

            case 4: possibleSquare = (colNum + 1).toString() + rowNum;
                kingPossibleMoves.push(possibleSquare);
                break;

            case 5: possibleSquare = (colNum - 1).toString() + (rowNum + 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 6: possibleSquare = (colNum + 1).toString() + (rowNum - 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 7: possibleSquare = (colNum + 1).toString() + (rowNum + 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 8: possibleSquare = (colNum - 1).toString() + (rowNum - 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            default: return kingPossibleMoves;
        }
    }
    return kingPossibleMoves;
}

function getEachEnemyPieceAllowedMoves(pieces, enemyColor) {

    let concatedArray = [];
    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color !== enemyColor) {
            // get all the allowed moves for all the enemy pieces ;
            concatedArray = [...concatedArray, ...checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces)];
        }
    });
    let filteredArray = concatedArray?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    return filteredArray;
}


export const AllowedMovesToEscapeCheckMate = (isCheckMate, attackerPiece, attackerCurrentSquare, currentKingSquare, pieces) => {

    // -----------------------  1   -------------------------

    let enemyColor = isCheckMate.white === true ? 'white' : 'black';
    let col = currentKingSquare[0];
    let row = currentKingSquare[1];

    // the checked king possible moves
    kingPossibleMoves = checkKingAllowedMoves(col, row, pieces);
    // all the enemy pieces allowed moves
    let enemyPiecesAllowedMoves = getEachEnemyPieceAllowedMoves(pieces, enemyColor);

    kingPossibleMoves.map((kingPossibleMove) => {
        if (!enemyPiecesAllowedMoves.includes(kingPossibleMove) &&
            pieces[kingPossibleMove]?.color !== enemyColor &&
            !kingPossibleMove.includes('0')) {

            kingAllowedMoves.push(kingPossibleMove);
        }

    })

    let finalArray = Array.from(new Set(kingAllowedMoves))

    return { ...checkMateAllowedMoves, 'king': finalArray }


    //TODO: THIS FUNCTION MUST RETURN THE OBJECT OF THE ALLOWED MOVES IN THE CHECK-MATE CASE ;
    // TO BE RETURNED TO THE STATE IN CHESS BOARD COMPONENT TO SET THE ALLOWED MOVES AGAIN;;;;;;

}