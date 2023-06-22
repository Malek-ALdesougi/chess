import * as CONSTANTS from "./constants";


const initialState = {
    11: { color: 'white', type: 'rook' },
    21: { color: 'white', type: 'knight' },
    31: { color: 'white', type: 'bishop' },
    41: { color: 'white', type: 'queen' },
    51: { color: 'white', type: 'king' },
    61: { color: 'white', type: 'bishop' },
    71: { color: 'white', type: 'knight' },
    81: { color: 'white', type: 'rook' },
    12: { color: 'white', type: 'pawn', basePostion: true },
    22: { color: 'white', type: 'pawn', basePostion: true },
    32: { color: 'white', type: 'pawn', basePostion: true },
    42: { color: 'white', type: 'pawn', basePostion: true },
    52: { color: 'white', type: 'pawn', basePostion: true },
    62: { color: 'white', type: 'pawn', basePostion: true },
    72: { color: 'white', type: 'pawn', basePostion: true },
    82: { color: 'white', type: 'pawn', basePostion: true },
    18: { color: 'black', type: 'rook' },
    28: { color: 'black', type: 'knight' },
    38: { color: 'black', type: 'bishop' },
    48: { color: 'black', type: 'queen' },
    58: { color: 'black', type: 'king' },
    68: { color: 'black', type: 'bishop' },
    78: { color: 'black', type: 'knight' },
    88: { color: 'black', type: 'rook' },
    17: { color: 'black', type: 'pawn', basePostion: true },
    27: { color: 'black', type: 'pawn', basePostion: true },
    37: { color: 'black', type: 'pawn', basePostion: true },
    47: { color: 'black', type: 'pawn', basePostion: true },
    57: { color: 'black', type: 'pawn', basePostion: true },
    67: { color: 'black', type: 'pawn', basePostion: true },
    77: { color: 'black', type: 'pawn', basePostion: true },
    87: { color: 'black', type: 'pawn', basePostion: true },
}


const piecesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_PIECES:
            return action.payload;
        case CONSTANTS.SHORT_CASTLING:
            console.log(action.payload);
            let shortKingOldLocation = Object.keys(state).find((piece) => piece === action.payload.kingSquare);
            let shortRookOldLocation = Object.keys(state).find((piece) => piece === action.payload.rookSquare);

            // console.log(shortKingOldLocation);
            let shortKingNewLocaiton = (Number(shortKingOldLocation[0]) + 2) + shortKingOldLocation[1];
            let shortRookNewLocation = (Number(shortRookOldLocation[0]) - 2) + shortRookOldLocation[1];

            const kingObject = state[shortKingOldLocation];
            const rookObject = state[shortRookOldLocation];

            delete state[shortKingOldLocation];
            delete state[shortRookOldLocation];

            return { ...state, [shortKingNewLocaiton]: kingObject, [shortRookNewLocation]: rookObject };

        case CONSTANTS.LONG_CASTLING:
            let longKingOldLocation = Object.keys(state).find((piece) => piece === action.payload.kingSquare);
            let longRookOldLocation = Object.keys(state).find((piece) => piece === action.payload.rookSquare);

            let longKingNewLocaiton = (Number(longKingOldLocation[0]) - 2) + longKingOldLocation[1];
            let longRookNewLocation = (Number(longRookOldLocation[0]) + 3) + longRookOldLocation[1];

            const longKingObject = state[longKingOldLocation];
            const longRookObject = state[longRookOldLocation];

            delete state[longKingOldLocation];
            delete state[longRookOldLocation];
            return { ...state, [longKingNewLocaiton]: longKingObject, [longRookNewLocation]: longRookObject };

        case CONSTANTS.PROMOTE_PAWN:
        console.log('reach here but not updating the piece');
            return { ...state, [action.payload.futureSquare]: { ...state[action.payload.futureSquare], type: action.payload.promotionType } };

        default: return state;
    }
}



export default piecesReducer;