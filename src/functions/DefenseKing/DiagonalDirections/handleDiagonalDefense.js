export function handleDiagonalDefense(attackerCurrentSquare, currentKingSquare, direction) {

    let defendableSquares = [];
    let kingCol;
    let kingRwo;
    let attackerCol = Number(attackerCurrentSquare[0]);
    let attackerRwo = Number(attackerCurrentSquare[1]);
    let square = ''

    switch (direction) {
        case 'right_bottom':
            kingCol = Number(currentKingSquare[0]) + 1;
            kingRwo = Number(currentKingSquare[1]) - 1;

            for (let i = kingCol, x = kingRwo; i < attackerCol || x < attackerRwo; i++, x--) {
                let col = i.toString();
                let row = x.toString();
                square = col + row;

                defendableSquares.push(square);
            }
            break;

        case 'right_top':
            kingCol = Number(currentKingSquare[0]) + 1;
            kingRwo = Number(currentKingSquare[1]) + 1;

            for (let i = kingCol, x = kingRwo; i < attackerCol || x < attackerRwo; i++, x++) {
                let col = i.toString();
                let row = x.toString();

                square = col + row;

                defendableSquares.push(square);
            }
            break;

        case 'left_bottom':
            kingCol = Number(currentKingSquare[0]) - 1;
            kingRwo = Number(currentKingSquare[1]) - 1;

            for (let i = kingCol, x = kingRwo; i > attackerCol || x > attackerRwo; i--, x--) {
                let col = i.toString();
                let row = x.toString();

                square = col + row;

                defendableSquares.push(square);
            }
            break;

        case 'left_top':
            kingCol = Number(currentKingSquare[0]) - 1;
            kingRwo = Number(currentKingSquare[1]) + 1;

            for (let i = kingCol, x = kingRwo; i > attackerCol || x < attackerRwo; i--, x++) {
                let col = i.toString();
                let row = x.toString();

                square = col + row;

                defendableSquares.push(square);
            }
            break;

        default: return defendableSquares;
    }
    return defendableSquares;

}