import * as CONSTATNS from "./constants";

export const UpdatePieces = (newPices) => (dispatch) => {
    dispatch({ type: CONSTATNS.UPDATE_PIECES, payload: newPices });
}


export function handleShortCastling(firsPiece, secondPiece) {

    let kingSquare ;
    let rookSquare;

    if(firsPiece.includes('5')){
        kingSquare = firsPiece;
        rookSquare = secondPiece
    }else{
        kingSquare = secondPiece;
        rookSquare = firsPiece;
    }

    return (dispatch) => {
        dispatch({type: CONSTATNS.SHORT_CASTLING, payload: {kingSquare: kingSquare, rookSquare: rookSquare}})
    }
}


export function handleLongCastling(firsPiece, secondPiece){

    let kingSquare ;
    let rookSquare;

    if(firsPiece.includes('5')){
        kingSquare = firsPiece;
        rookSquare = secondPiece
    }else{
        kingSquare = secondPiece;
        rookSquare = firsPiece;
    }

    return (dispatch) => {
        dispatch({type: CONSTATNS.LONG_CASTLING, payload:{kingSquare: kingSquare, rookSquare: rookSquare}})
    }

}
