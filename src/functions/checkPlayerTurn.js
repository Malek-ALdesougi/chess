export const checkPlayerTurn = (col, row, playerTurn, pieces,square) => {
    let firstPick = square;
    // check the player turn
    if (playerTurn === false && pieces[col + row]?.color === 'white') {
        alert("It's the Black turn now");
        return false;
    } else if (playerTurn === true && pieces[col + row]?.color === 'black') {
        alert("It's the White turn now");
        return false;
    }
    return true;
};