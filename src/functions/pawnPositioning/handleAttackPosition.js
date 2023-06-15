
export function handleAttackPosition(col, row, operator) {

    const num1 = parseInt(col);
    const num2 = parseInt(row);
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