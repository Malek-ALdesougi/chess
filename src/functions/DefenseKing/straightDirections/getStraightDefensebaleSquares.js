import { handleStraightDefense } from "./handleStraightDefense";


export function getStraightDirection(attackerCurrentSquare, currentKingSquare){
    if (Number(attackerCurrentSquare[0]) === Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) > Number(currentKingSquare[1])) {
        return 'top'
    }
    else if (Number(attackerCurrentSquare[0]) === Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) < Number(currentKingSquare[1])) {
        return 'bottom'
    } else if (Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) === Number(currentKingSquare[1])) {
        return 'right'
    } else if (Number(attackerCurrentSquare[0]) < Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) === Number(currentKingSquare[1])) {
        return 'left'
    }
}

export function getStraightDefensebaleSquares(attackerCurrentSquare, currentKingSquare) {

    let squares = [];
    let direction = getStraightDirection(attackerCurrentSquare, currentKingSquare);
    //rook attack defense logic
    squares = handleStraightDefense(attackerCurrentSquare, currentKingSquare, direction)

    
    return squares;

}