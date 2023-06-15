//functions
import { checkMovesForSinglePiece } from "../singlePieceMoves/checkMovesSingle";

export function getEachEnemyPieceAllowedMoves(pieces, enemyColor, chekker) {

    //TODO: IT MIGHT BE SOMETHING WRONG WITH THE RETURN OF THIS FUNCTION

    let concatedArray = [];
    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color === enemyColor) {
            // get all the allowed moves for all the enemy pieces ;
            concatedArray = [...concatedArray, ...checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces, chekker)];
        }
    });
    let filteredArray = concatedArray?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    return filteredArray;
}