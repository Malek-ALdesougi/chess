//Notification
import { Notification } from "../../components/toastifyAlert/toastify";

export const checkPlayerTurn = (col, row, playerTurn, pieces,square) => {
    // check the player turn
    if (playerTurn === false && pieces[col + row]?.color === 'white') {
        Notification("It's Black turn now", 'orange')
        return false;
    } else if (playerTurn === true && pieces[col + row]?.color === 'black') {
        Notification("It's White turn now", 'orange')
        return false;
    }
    return true;
};