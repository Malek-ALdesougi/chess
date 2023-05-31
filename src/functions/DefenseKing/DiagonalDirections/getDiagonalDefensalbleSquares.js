import { handleDiagonalDefense } from "./handleDiagonalDefense";


export function getDiagonalDefensalbleSquares(attackerCurrentSquare, currentKingSquare) {
    let squares = [];
    let direction;
    //bishop attack logic
    if (Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) < Number(currentKingSquare[1])) {
        direction = 'right_bottom'
        squares = handleDiagonalDefense(attackerCurrentSquare, currentKingSquare, direction)
    }

    else if (Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) > Number(currentKingSquare[1])) {

        direction = 'right_top'
        squares = handleDiagonalDefense(attackerCurrentSquare, currentKingSquare, direction)

    } else if (Number(attackerCurrentSquare[0]) < Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) < Number(currentKingSquare[1])) {

        direction = 'left_bottom'
        squares = handleDiagonalDefense(attackerCurrentSquare, currentKingSquare, direction)

    } else if (Number(attackerCurrentSquare[0]) < Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) > Number(currentKingSquare[1])) {

        direction = 'left_top'
        squares = handleDiagonalDefense(attackerCurrentSquare, currentKingSquare, direction)
    }

    return squares;

}