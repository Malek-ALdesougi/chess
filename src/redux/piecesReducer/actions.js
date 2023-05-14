import * as CONSTATNS from "./constants";

export const UpdatePieces = (newPices) => (dispatch) => {
    dispatch({ type: CONSTATNS.UPDATE_PIECES, payload: newPices });
}
