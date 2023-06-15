
export function handleNewPosition(col, row, color) {
    let operator;
    const num1 = parseInt(col);
    const num2 = parseInt(row);
    let result = num1 + num2;

    // decide white operator to use
    if (color === 'white') {
        operator = '+';
    } else {
        operator = '-';
    }

    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else {
        return 'Invalid operator';
    }

    return result.toString();
}
