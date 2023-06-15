export function bishopNewPositionUpRightDownLeft(col, row, operator, increaseValue) {
    const num1 = parseInt(col);
    const num2 = parseInt(row);
    let newCol;
    let newRow;
    let result;

    if (operator === '+') {
        newCol = (num1 + increaseValue);
        newRow = (num2 + increaseValue);
        result = newCol.toString() + newRow.toString();
        return result;
    } else if (operator === '-') {
        newCol = num1 - increaseValue;
        newRow = num2 - increaseValue;
        result = newCol.toString() + newRow.toString();
        return result;
    }

}