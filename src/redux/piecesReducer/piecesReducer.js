import { UPDATE_PIECES } from "./constants";


const initialState = {
    a1: { color: 'white', type: 'rook', allowdMoves: {} },
    b1: { color: 'white', type: 'knight', allowdMoves: {} },
    c1: { color: 'white', type: 'bishop', allowdMoves: {} },
    d1: { color: 'white', type: 'queen', allowdMoves: {} },
    e1: { color: 'white', type: 'king', allowdMoves: {} },
    f1: { color: 'white', type: 'bishop', allowdMoves: {} },
    g1: { color: 'white', type: 'knight', allowdMoves: {} },
    h1: { color: 'white', type: 'rook', allowdMoves: {} },
    a2: { color: 'white', type: 'pawn', allowdMoves: {} },
    b2: { color: 'white', type: 'pawn', allowdMoves: {} },
    c2: { color: 'white', type: 'pawn', allowdMoves: {} },
    d2: { color: 'white', type: 'pawn', allowdMoves: {} },
    e2: { color: 'white', type: 'pawn', allowdMoves: {} },
    f2: { color: 'white', type: 'pawn', allowdMoves: {} },
    g2: { color: 'white', type: 'pawn', allowdMoves: {} },
    h2: { color: 'white', type: 'pawn', allowdMoves: {} },
    a8: { color: 'black', type: 'rook', allowdMoves: {} },
    b8: { color: 'black', type: 'knight', allowdMoves: {} },
    c8: { color: 'black', type: 'bishop', allowdMoves: {} },
    d8: { color: 'black', type: 'queen', allowdMoves: {} },
    e8: { color: 'black', type: 'king', allowdMoves: {} },
    f8: { color: 'black', type: 'bishop', allowdMoves: {} },
    g8: { color: 'black', type: 'knight', allowdMoves: {} },
    h8: { color: 'black', type: 'rook', allowdMoves: {} },
    a7: { color: 'black', type: 'pawn', allowdMoves: {} },
    b7: { color: 'black', type: 'pawn', allowdMoves: {} },
    c7: { color: 'black', type: 'pawn', allowdMoves: {} },
    d7: { color: 'black', type: 'pawn', allowdMoves: {} },
    e7: { color: 'black', type: 'pawn', allowdMoves: {} },
    f7: { color: 'black', type: 'pawn', allowdMoves: {} },
    g7: { color: 'black', type: 'pawn', allowdMoves: {} },
    h7: { color: 'black', type: 'pawn', allowdMoves: {} },
}


const piecesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PIECES:
            return action.payload
        default: return state;
    }
}



export default piecesReducer;