import { UPDATE_PIECES } from "./constants";

export const UpdatePieces = (newPices) => (dispatch) => {

    dispatch({type: UPDATE_PIECES, payload: newPices});

}