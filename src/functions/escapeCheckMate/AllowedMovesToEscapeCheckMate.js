// Reuse checkMovesForSinglePiece
import { checkMovesForSinglePiece } from "../singlePieceMoves/checkMovesSingle";

import { checkIfCanAnyPieceBlock } from "../DefenseKing/blockDefenders/checkIfCanAnyPieceBlock";

import { checkIfAttackerCouldBeEaten } from "../DefenseKing/eatDefenders/checkIfAttackerCouldBeEaten";

import { getEachEnemyPieceAllowedMoves } from "../enemyPiecesAllowedMoves/getEachEnemyPieceAllowedMoves";

import { getAttackerOppositeSquare } from "../oppositeSquareInCheckMate/getAttackerOppositeSquare";

import { getAttackerDirection } from "../oppositeSquareInCheckMate/getAttackerDirection";

const checkMateAllowedMoves = {};
let kingPossibleMoves = [];
let kingAllowedMoves = [];
let eatDefenders = {};
let blockDefenders = {};


function checkKingPossibleMoves(col, row) {

    //check the safty for THE EACH possible square for all direction around it
    let colNum = parseInt(col);
    let rowNum = parseInt(row);
    let possibleSquare;

    for (let i = 1; i <= 8; i++) {
        switch (i) {
            case 1:
                possibleSquare = colNum + (rowNum + 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 2: possibleSquare = colNum + (rowNum - 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 3: possibleSquare = (colNum - 1).toString() + rowNum;
                kingPossibleMoves.push(possibleSquare);
                break;

            case 4: possibleSquare = (colNum + 1).toString() + rowNum;
                kingPossibleMoves.push(possibleSquare);
                break;

            case 5: possibleSquare = (colNum - 1).toString() + (rowNum + 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 6: possibleSquare = (colNum + 1).toString() + (rowNum - 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 7: possibleSquare = (colNum + 1).toString() + (rowNum + 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            case 8: possibleSquare = (colNum - 1).toString() + (rowNum - 1).toString();
                kingPossibleMoves.push(possibleSquare);
                break;

            default: return kingPossibleMoves;
        }
    }
    return kingPossibleMoves;
}


export function getFriedlyPiecesAllowedMoves(pieces, enemyColor, attackerCurrentSquare, defensableSquares) {


    let concatedArrayTow = [];
    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color !== enemyColor) {
            // get all the allowed moves for all the friendly pieces !!
            let singlePieceAllowedMoves = checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces);

            // store the BLOCK defenders in a new object
            if (defensableSquares?.length !== 0) {
                let square = singlePieceAllowedMoves?.find(square => defensableSquares?.includes(square))
                if (square) {
                    blockDefenders = { ...blockDefenders, [pieces[sinlgePiece]?.type + sinlgePiece]: square }
                }
            }

            // store the EAT defenders in a new object
            if (singlePieceAllowedMoves.includes(attackerCurrentSquare)) {
                if (blockDefenders.hasOwnProperty([pieces[sinlgePiece]?.type + sinlgePiece])) {
                    // in case a single piece could be attacker and defender at the same time
                    blockDefenders = { ...blockDefenders, [pieces[sinlgePiece]?.type + sinlgePiece]: [blockDefenders[[pieces[sinlgePiece]?.type + sinlgePiece]], attackerCurrentSquare] }
                }
                eatDefenders = { ...eatDefenders, [pieces[sinlgePiece]?.type + sinlgePiece]: attackerCurrentSquare }
            }
            concatedArrayTow = [...concatedArrayTow, ...singlePieceAllowedMoves];
        }
    })


    let filteredArray = concatedArrayTow?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    return filteredArray;
}


export const AllowedMovesToEscapeCheckMate = (isCheckMate, attackerPiece, attackerCurrentSquare, currentKingSquare, pieces, checkMateType) => {

    // <<<<<<<<<==========================================  1- Normal Moves  ==========================================>>>>>>>>>>
    let attackerDirection = ''

    kingAllowedMoves = [];
    eatDefenders = {};
    blockDefenders = {};
    attackerDirection = getAttackerDirection(attackerPiece, attackerCurrentSquare, currentKingSquare, pieces);

    let oppositeSquare = getAttackerOppositeSquare(attackerDirection, currentKingSquare);


    // rest the variable :
    let resultObject = {};
    let chekker = 'king';
    kingPossibleMoves = [];

    let enemyColor;
    if (isCheckMate.white === true) {
        enemyColor = 'black';
    } else if (isCheckMate.black === true) {
        enemyColor = 'white';
    }
    let col = currentKingSquare[0];
    let row = currentKingSquare[1];

    // the checked king possible moves
    kingPossibleMoves = checkKingPossibleMoves(col, row, pieces, chekker);

    // all the enemy pieces allowed moves
    let enemyPiecesAllowedMoves = getEachEnemyPieceAllowedMoves(pieces, enemyColor, chekker);

    kingPossibleMoves.map((kingPossibleMove) => {
        if (!enemyPiecesAllowedMoves.includes(kingPossibleMove) &&
            (pieces[kingPossibleMove]?.color === enemyColor || pieces[kingPossibleMove] === undefined)) {
            kingAllowedMoves.push(kingPossibleMove);
        }

    })

    if (checkMateType === 'double') {
        // if the case is double checkmate then there is no eat or block defenders !!
        let finalArray = Array.from(new Set(kingAllowedMoves)).filter((item) => item !== oppositeSquare && !item.includes('0') && !item.includes('-') && !item.includes('9'));
        return { 'king': finalArray }
    }

    // <<<<<<<<==========================================  2- Eaters Pieces  ==========================================>>>>>>>>>>

    checkIfAttackerCouldBeEaten(attackerPiece, attackerCurrentSquare, pieces, enemyColor);

    // <<<<<<<<==========================================  3- Blockers Pieces   ==========================================>>>>>>>>>>
    checkIfCanAnyPieceBlock(attackerPiece, attackerCurrentSquare, currentKingSquare, pieces, enemyColor)

    let filterdKingMoves = kingAllowedMoves.filter(item => !item.includes('9') && !item.includes('0') && !item.includes('-') && item !== oppositeSquare)
    resultObject = { ...checkMateAllowedMoves, 'king': filterdKingMoves, ...eatDefenders, ...blockDefenders }

    return resultObject;
}