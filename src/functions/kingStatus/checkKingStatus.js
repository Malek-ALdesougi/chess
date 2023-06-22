import { checkMovesForSinglePiece } from "../singlePieceMoves/checkMovesSingle";

export const checkKingStatus = (pieces, enemyColor) => {

    let kingCurrentSquare = '';
    let friedlyPieceAllowedMoves = [];
    let chekker = 'king';
    let attackersPieces = [];
    let attackerSquare = '';
    let checkMateType = '';
    let isThereCheckMate = false;
    
    Object.keys(pieces).map((piece) => {

        //get the enemy king current square
        if (pieces[piece]?.color === enemyColor && pieces[piece]?.type === 'king') {
            kingCurrentSquare = piece;
        }



        //get all friendly pieces allowed moves
        if (pieces[piece]?.color !== enemyColor) {
            friedlyPieceAllowedMoves = checkMovesForSinglePiece(pieces[piece], piece[0], piece[1], pieces, chekker);
            friedlyPieceAllowedMoves?.map((item) => {
                if (pieces[item]?.type === 'king' && pieces[item]?.color === enemyColor) {
                    attackersPieces = [...attackersPieces, pieces[piece]];
                    attackerSquare = piece;
                    isThereCheckMate = true;
                }
            })
        }
    })

    if (attackersPieces !== []) {
        
         attackersPieces = Array.from(new Set(attackersPieces));

        if (attackersPieces.length > 1) {
            checkMateType = 'double';
        } else if (attackersPieces.length === 1) {
            checkMateType = 'single';
        }
    }
    if(isThereCheckMate === true){
        return {attackersPieces, attackerSquare, checkMateType,kingCurrentSquare, isThereCheckMate};
    }else{
        return false ;
    }
}