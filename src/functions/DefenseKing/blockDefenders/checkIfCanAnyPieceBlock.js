//functions
import { getDiagonalDefensalbleSquares } from "../DiagonalDirections/getDiagonalDefensalbleSquares";
import { getStraightDefensebaleSquares } from "../straightDirections/getStraightDefensebaleSquares";
import { getFriedlyPiecesAllowedMoves } from "../../escapeCheckMate/AllowedMovesToEscapeCheckMate";


export const checkIfCanAnyPieceBlock = (attackerPiece, attackerCurrentSquare, currentKingSquare, pieces, enemyColor) => {

    let defensableSquares = [];

    if (attackerPiece[0]?.type === 'bishop') {
        defensableSquares = getDiagonalDefensalbleSquares(attackerCurrentSquare, currentKingSquare);
    }
    else if (attackerPiece[0]?.type === 'rook') {
        defensableSquares = getStraightDefensebaleSquares(attackerCurrentSquare, currentKingSquare);
    }

    else if (attackerPiece[0]?.type === 'queen') {
        //compination between the bishop and rook because the queen will attack either diagonal or stright 
        let diagonal = getDiagonalDefensalbleSquares(attackerCurrentSquare, currentKingSquare)
        let straight = getStraightDefensebaleSquares(attackerCurrentSquare, currentKingSquare)

        if(diagonal.length > 0){
            defensableSquares = diagonal;
        }else if(straight.length > 0){
            defensableSquares = straight;
        }

    }
   return getFriedlyPiecesAllowedMoves(pieces, enemyColor, attackerCurrentSquare, defensableSquares)
}