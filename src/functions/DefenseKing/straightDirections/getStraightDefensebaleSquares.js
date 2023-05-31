import { handleStraightDefense } from "./handleStraightDefense";

export function getStraightDefensebaleSquares(attackerCurrentSquare, currentKingSquare) {

    let squares = [];
    let direction;
    //rook attack defense logic
    if (Number(attackerCurrentSquare[0]) === Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) > Number(currentKingSquare[1])) {
        direction = 'top'
        squares = handleStraightDefense(attackerCurrentSquare, currentKingSquare, direction)
    }

    else if (Number(attackerCurrentSquare[0]) === Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) < Number(currentKingSquare[1])) {

        direction = 'bottom'
        squares = handleStraightDefense(attackerCurrentSquare, currentKingSquare, direction)

    } else if (Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) === Number(currentKingSquare[1])) {

        direction = 'right'
        squares = handleStraightDefense(attackerCurrentSquare, currentKingSquare, direction)

    } else if (Number(attackerCurrentSquare[0]) < Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) === Number(currentKingSquare[1])) {

        direction = 'left'
        squares = handleStraightDefense(attackerCurrentSquare, currentKingSquare, direction)
    }

    return squares;

}