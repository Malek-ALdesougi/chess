//functions
import { getDiagonalDirection } from "../DefenseKing/DiagonalDirections/getDiagonalDefensalbleSquares";
import { getStraightDirection } from "../DefenseKing/straightDirections/getStraightDefensebaleSquares";


export function getAttackerDirection(attackerPiece, attackerCurrentSquare, currentKingSquare, pieces) {

    let direciton;
    if (attackerPiece[0]?.type === 'bishop') {
        direciton = getDiagonalDirection(attackerCurrentSquare, currentKingSquare)
    }

    if (attackerPiece[0]?.type === 'rook') {
        direciton = getStraightDirection(attackerCurrentSquare, currentKingSquare)
    }

    if (attackerPiece[0]?.type === 'queen') {
        let diagonal = getDiagonalDirection(attackerCurrentSquare, currentKingSquare);
        let straight = getStraightDirection(attackerCurrentSquare, currentKingSquare);

        direciton = diagonal ? diagonal : straight;
    }

    return direciton;
    // now all squares in the opposite direction will be not allowd for the king 

}