
export function bishopNewPositionUpLeftDownRight(col, operatorOne, row, operatorTwo, increaseValue) {
    let num1 = parseInt(col);
    let num2 = parseInt(row);
    let newCol;
    let newRow;
    let result;

    if (operatorOne === '+') {
        newCol = num1 + increaseValue;
        newRow = num2 - increaseValue;
        result = newCol.toString() + newRow.toString();
        return result;
    } else {
        newCol = num1 - increaseValue;
        newRow = num2 + increaseValue;
        result = newCol.toString() + newRow.toString();
        return result;
    }
}