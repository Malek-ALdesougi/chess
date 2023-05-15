import * as CONSTANTS from "./constants";


const initialState = {
    11: { color: 'white', type: 'rook', allowdMoves: {} },
    21: { color: 'white', type: 'knight', allowdMoves: {} },
    31: { color: 'white', type: 'bishop', allowdMoves: {} },
    41: { color: 'white', type: 'queen', allowdMoves: {} },
    51: { color: 'white', type: 'king', allowdMoves: {} },
    61: { color: 'white', type: 'bishop', allowdMoves: {} },
    71: { color: 'white', type: 'knight', allowdMoves: {} },
    81: { color: 'white', type: 'rook', allowdMoves: {} },
    12: { color: 'white', type: 'pawn',basePostion: true, allowdMoves: {} },
    22: { color: 'white', type: 'pawn',basePostion: true, allowdMoves: {} },
    32: { color: 'white', type: 'pawn',basePostion: true, allowdMoves: {} },
    42: { color: 'white', type: 'pawn',basePostion: true, allowdMoves: {} },
    52: { color: 'white', type: 'pawn',basePostion: true, allowdMoves: {} },
    62: { color: 'white', type: 'pawn',basePostion: true, allowdMoves: {} },
    72: { color: 'white', type: 'pawn',basePostion: true, allowdMoves: {} },
    82: { color: 'white', type: 'pawn',basePostion: true, allowdMoves: {} },
    18: { color: 'black', type: 'rook', allowdMoves: {} },
    28: { color: 'black', type: 'knight', allowdMoves: {} },
    38: { color: 'black', type: 'bishop', allowdMoves: {} },
    48: { color: 'black', type: 'queen', allowdMoves: {} },
    58: { color: 'black', type: 'king', allowdMoves: {} },
    68: { color: 'black', type: 'bishop', allowdMoves: {} },
    78: { color: 'black', type: 'knight', allowdMoves: {} },
    88: { color: 'black', type: 'rook', allowdMoves: {} },
    17: { color: 'black', type: 'pawn',basePostion: true, allowdMoves: {} },
    27: { color: 'black', type: 'pawn',basePostion: true, allowdMoves: {} },
    37: { color: 'black', type: 'pawn',basePostion: true, allowdMoves: {} },
    47: { color: 'black', type: 'pawn',basePostion: true, allowdMoves: {} },
    57: { color: 'black', type: 'pawn',basePostion: true, allowdMoves: {} },
    67: { color: 'black', type: 'pawn',basePostion: true, allowdMoves: {} },
    77: { color: 'black', type: 'pawn',basePostion: true, allowdMoves: {} },
    87: { color: 'black', type: 'pawn',basePostion: true, allowdMoves: {} },
}


const piecesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_PIECES:
            return action.payload;
        default: return state;
    }
}



export default piecesReducer;