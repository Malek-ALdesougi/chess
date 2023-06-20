import * as CONSTATNS from "./constants";

export const UpdatePieces = (newPices) => (dispatch) => {
    dispatch({ type: CONSTATNS.UPDATE_PIECES, payload: newPices });
}


export function handleShortCastling(firsPiece, secondPiece) {

    let kingSquare ;
    let rookSquare;
    console.log(firsPiece);
    console.log(secondPiece);
    if(firsPiece.includes('5')){
        console.log(firsPiece + 'is the king square');
        kingSquare = firsPiece;
        rookSquare = secondPiece
    }else{
        kingSquare = secondPiece;
        rookSquare = firsPiece;
        console.log(secondPiece + 'is the king square');
    }

    return (dispatch) => {
        dispatch({type: CONSTATNS.SHORT_CASTLING, payload: {kingSquare: kingSquare, rookSquare: rookSquare}})
    }
}
