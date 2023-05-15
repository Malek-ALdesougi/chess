





function handleOperations(str1, str2, operator) {
    const num1 = parseInt(str1);
    const num2 = parseInt(str2);
    let result = num1 + num2;

    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else {
        return 'Invalid operator';
    }

    return result.toString();
}

export function checkMovesForSinglePiece(thePiece, currentCol, currentRow, pieces) {

    const allowedMoves = [];
    switch (thePiece?.type) {
        case 'pawn':
            if (thePiece.color === 'white') {

                // check the position for the current pawn

                // if the pawn has any piece in front of it ... it cant move to this square 
                if(pieces[currentCol + handleOperations(currentRow, '1', '+')] !== undefined){
                    allowedMoves.push( 
                    handleOperations(currentCol, '1', '+') + handleOperations(currentRow, '1', '+'),
                    handleOperations(currentCol, '1', '-') + handleOperations(currentRow, '1', '+'))
                }

                //TODO: change the base position for the pawn after first move;
                if(thePiece.basePostion === true){
                    allowedMoves.push(currentCol + handleOperations(currentRow, '2', '+'))
                }
                allowedMoves.push(
                    //up move when its not in the base position;
                    currentCol + handleOperations(currentRow, '1', '+'),
                    //left & right moves
                    handleOperations(currentCol, '1', '+') + handleOperations(currentRow, '1', '+'),
                    handleOperations(currentCol, '1', '-') + handleOperations(currentRow, '1', '+'));
                console.log('white pawn');
            } else {
                console.log('black pawn');
            }



            //the pawn can't move forward at all if there any pieces
            if (pieces[currentCol + eval(`${currentRow} + 1`)] !== undefined) {
                return allowedMoves;
            } else if (thePiece.color === 'white' && thePiece.basePostion) {
                //   return  allowedMoves.push(
                //     //   `${eval(`${currentCol} + 1`)}` + `${eval(`${currentCol} + 1 `)}`,
                //       handleOperations(currentCol, '1', '+') + handleOperations(currentRow, '1', '+'), 
                //     //   currentCol + `${eval(`${currentRow} + 2`)}`,
                //      currentCol + handleOperations(currentRow, '2', '+'), 
                //     // `${eval(`${currentCol} + 1`)}` + `${eval(`${currentRow} + 1`)}`)
                //      handleOperations(currentCol, '1', '-') + handleOperations(currentRow, '1', '+'));
                //     // allowedMoves
                //     //the pawn can't move forward at all if there any pieces
                //     // )
            } else {
                return allowedMoves.push(currentCol + eval(`${currentRow} + 1`));
            }

        default:
            return allowedMoves;
    }

    // console.log(thePiece);
    // console.log(currentCol);
    // console.log(currentRow);
}