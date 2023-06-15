//functions
import { getFriedlyPiecesAllowedMoves } from "../../escapeCheckMate/AllowedMovesToEscapeCheckMate"

export const checkIfAttackerCouldBeEaten = (attackerPiece, attackerCurrentSquare, pieces, enemyColor) => {

    // need to determine the attacker type 

    // cehck if the attacker square is in the allowed moves for any of my pieces

    // We have 2 categoryies of attackers --------->>>> queen bishop pawn rook ||| knight

    getFriedlyPiecesAllowedMoves(pieces, enemyColor, attackerCurrentSquare)
}
