import { handleDiagonalDefense } from "./handleDiagonalDefense";

export function getDiagonalDirection(attackerCurrentSquare, currentKingSquare){

    if (Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) < Number(currentKingSquare[1])) {
        return 'right_bottom'
    }else if (Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) > Number(currentKingSquare[1])) {
        return 'right_top'

    } else if (Number(attackerCurrentSquare[0]) < Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) < Number(currentKingSquare[1])) {
        return 'left_bottom'

    } else if (Number(attackerCurrentSquare[0]) < Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) > Number(currentKingSquare[1])) {
        return 'left_top'
    }

}

export function getDiagonalDefensalbleSquares(attackerCurrentSquare, currentKingSquare, returnOnlyDirection = false) {
    let squares = [];
    let direction = getDiagonalDirection(attackerCurrentSquare, currentKingSquare);
    //bishop attack logic
    squares = handleDiagonalDefense(attackerCurrentSquare, currentKingSquare, direction)

    console.log(direction);
    if(returnOnlyDirection){
        return direction
    }

    return squares;

}