//fucntions
import { getOppositeSquare } from "./getOppositeSquare";

export function getAttackerOppositeSquare(attackerDirection, currentKingSquare) {

    let oppositeSquare = '';
    let kingCurrentCol = parseInt(currentKingSquare[0]);
    let kingCurrentRow = parseInt(currentKingSquare[1]);

    switch (attackerDirection) {
        case 'top':
            kingCurrentRow = (kingCurrentRow - 1).toString()
            oppositeSquare = getOppositeSquare(kingCurrentCol, kingCurrentRow);
            break;
        case 'bottom':
            kingCurrentRow = (kingCurrentRow + 1).toString()
            oppositeSquare = getOppositeSquare(kingCurrentCol, kingCurrentRow);
            break;

        case 'right':
            kingCurrentCol = (kingCurrentCol - 1).toString();
            oppositeSquare = getOppositeSquare(kingCurrentCol, kingCurrentRow);
            break;
        case 'left':
            kingCurrentCol = (kingCurrentCol + 1).toString();
            oppositeSquare = getOppositeSquare(kingCurrentCol, kingCurrentRow);
            break;
        case 'right_top':
            kingCurrentCol = (kingCurrentCol - 1).toString()
            kingCurrentRow = (kingCurrentRow - 1).toString();
            oppositeSquare = getOppositeSquare(kingCurrentCol, kingCurrentRow);
            break;

        case 'right_bottom':
            kingCurrentCol = (kingCurrentCol - 1).toString()
            kingCurrentRow = (kingCurrentRow + 1).toString();
            oppositeSquare = getOppositeSquare(kingCurrentCol, kingCurrentRow);
            break;

        case 'left_bottom':
            kingCurrentCol = (kingCurrentCol + 1).toString()
            kingCurrentRow = (kingCurrentRow + 1).toString();
            oppositeSquare = getOppositeSquare(kingCurrentCol, kingCurrentRow);
            break;

        case 'left_top':
            kingCurrentCol = (kingCurrentCol + 1).toString()
            kingCurrentRow = (kingCurrentRow - 1).toString();
            oppositeSquare = getOppositeSquare(kingCurrentCol, kingCurrentRow);
            break;

        default: return oppositeSquare;
    }

    return oppositeSquare;
}