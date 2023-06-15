export function rookNewPosition(columnOrRow, operator, value) {
    let corlOrRowNub = parseInt(columnOrRow);
    let result;

    if (operator === '+') {
        result = corlOrRowNub + value;
    } else if (operator === '-') {
        result = corlOrRowNub - value;
    }
    return result.toString();

}