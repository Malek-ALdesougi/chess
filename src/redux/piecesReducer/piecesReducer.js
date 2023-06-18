import * as CONSTANTS from "./constants";


const initialState = {
    11: { color: 'white', type: 'rook'},
    21: { color: 'white', type: 'knight'},
    31: { color: 'white', type: 'bishop'},
    41: { color: 'white', type: 'queen'},
    51: { color: 'white', type: 'king'},
    61: { color: 'white', type: 'bishop'},
    71: { color: 'white', type: 'knight'},
    81: { color: 'white', type: 'rook'},
    12: { color: 'white', type: 'pawn',basePostion: true},
    22: { color: 'white', type: 'pawn',basePostion: true},
    32: { color: 'white', type: 'pawn',basePostion: true},
    42: { color: 'white', type: 'pawn',basePostion: true},
    52: { color: 'white', type: 'pawn',basePostion: true},
    62: { color: 'white', type: 'pawn',basePostion: true},
    72: { color: 'white', type: 'pawn',basePostion: true},
    82: { color: 'white', type: 'pawn',basePostion: true},
    18: { color: 'black', type: 'rook'},
    28: { color: 'black', type: 'knight'},
    38: { color: 'black', type: 'bishop'},
    48: { color: 'black', type: 'queen'},
    58: { color: 'black', type: 'king'},
    68: { color: 'black', type: 'bishop'},
    78: { color: 'black', type: 'knight'},
    88: { color: 'black', type: 'rook'},
    17: { color: 'black', type: 'pawn',basePostion: true},
    27: { color: 'black', type: 'pawn',basePostion: true},
    37: { color: 'black', type: 'pawn',basePostion: true},
    47: { color: 'black', type: 'pawn',basePostion: true},
    57: { color: 'black', type: 'pawn',basePostion: true},
    67: { color: 'black', type: 'pawn',basePostion: true},
    77: { color: 'black', type: 'pawn',basePostion: true},
    87: { color: 'black', type: 'pawn',basePostion: true},
}


const piecesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_PIECES:
            return action.payload;
        default: return state;
    }
}



export default piecesReducer;