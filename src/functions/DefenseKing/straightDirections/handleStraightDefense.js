export function handleStraightDefense(attackerCurrentSquare, currentKingSquare, direction) {
    let defendableSquares = [];
    let kingRwo;
    let kingCol;
    let attackerCol = Number(attackerCurrentSquare[0]);
    let attackerRwo = Number(attackerCurrentSquare[1]);
    let square = ''


    switch (direction) {
        case 'top':
            kingRwo = Number(currentKingSquare[1]) + 1;

            for (let x = kingRwo; x < attackerRwo; x++) {
                let row = x.toString();
                square = currentKingSquare[0] + row;
                defendableSquares.push(square);
            }
            break;

        case 'bottom':
            kingRwo = Number(currentKingSquare[1]) - 1;

            for (let x = kingRwo; x > attackerRwo; x--) {
                let row = x.toString();

                square = currentKingSquare[0] + row;
                defendableSquares.push(square);
            }
            break;

        case 'right':
            kingCol = Number(currentKingSquare[0]) + 1;

            for (let i = kingCol; i < attackerCol; i++) {
                let col = i.toString();
                square = col + currentKingSquare[1];
                defendableSquares.push(square);
            }
            break;

        case 'left':
            kingCol = Number(currentKingSquare[0]) - 1;

            for (let i = kingCol; i > attackerCol; i--) {
                let col = i.toString();
                square = col + currentKingSquare[1];
                defendableSquares.push(square);
            }
            break;

        default: return defendableSquares;
    }
    return defendableSquares;

}
