// Reuse checkMovesForSinglePiece
import { checkMovesForSinglePiece } from "./checkMovesSingle";

import { getDiagonalDefensalbleSquares } from "./DefenseKing/DiagonalDirections/getDiagonalDefensalbleSquares";

import { getStraightDefensebaleSquares } from "./DefenseKing/straightDirections/getStraightDefensebaleSquares";

const checkMateAllowedMoves = {};
let kingPossibleMoves = [];
let kingAllowedMoves = [];
let eatDefenders = {};
let blockDefenders = {};


function checkKingAllowedMoves(col, row) {

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

export function getEachEnemyPieceAllowedMoves(pieces, enemyColor, chekker) {

    //TODO: IT MIGHT BE SOMETHING WRONG WITH THE RETURN OF THIS FUNCTION

    let concatedArray = [];
    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color === enemyColor) {
            // get all the allowed moves for all the enemy pieces ;
            concatedArray = [...concatedArray, ...checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces, chekker)];
        }
    });
    let filteredArray = concatedArray?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    return filteredArray;
}

export function getFriedlyPiecesAllowedMoves(pieces, enemyColor, attackerCurrentSquare, defensableSquares) {

    let concatedArrayTow = [];
    console.log(enemyColor);
    // let chekker = 'king';
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
                console.log('includes');
                console.log(attackerCurrentSquare);
                eatDefenders = { ...eatDefenders, [pieces[sinlgePiece]?.type + sinlgePiece]: attackerCurrentSquare }
            }
            concatedArrayTow = [...concatedArrayTow, ...singlePieceAllowedMoves];
        }
    })

    
    let filteredArray = concatedArrayTow?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    return filteredArray;
}

const checkIfAttackerCouldBeEaten = (attackerPiece, attackerCurrentSquare, pieces, enemyColor) => {

    // need to determine the attacker type 

    // cehck if the attacker square is in the allowed moves for any of my pieces

    // We have 2 categoryies of attackers --------->>>> queen bishop pawn rook ||| knight

    getFriedlyPiecesAllowedMoves(pieces, enemyColor, attackerCurrentSquare)
}

const checkIfCanAnyPieceBlock = (attackerPiece, attackerCurrentSquare, currentKingSquare, pieces, enemyColor) => {

    let defensableSquares = [];
    console.log(enemyColor);

    if (attackerPiece[0].type === 'bishop') {
        defensableSquares = getDiagonalDefensalbleSquares(attackerCurrentSquare, currentKingSquare);
    }
    else if (attackerPiece[0].type === 'rook') {
        defensableSquares = getStraightDefensebaleSquares(attackerCurrentSquare, currentKingSquare);
    }

    else if (attackerPiece[0].type === 'queen') {
        //compination between the bishop and rook because the queen will attack either diagonal or stright 
        let diagonal = getDiagonalDefensalbleSquares(attackerCurrentSquare, currentKingSquare)
        let straight = getStraightDefensebaleSquares(attackerCurrentSquare, currentKingSquare)
        defensableSquares = diagonal ? diagonal : straight;
    }
   return getFriedlyPiecesAllowedMoves(pieces, enemyColor, attackerCurrentSquare, defensableSquares)
}







export const AllowedMovesToEscapeCheckMate = (isCheckMate, attackerPiece, attackerCurrentSquare, currentKingSquare, pieces, checkMateType) => {

    // <<<<<<<<<==========================================  1- Normal Moves  ==========================================>>>>>>>>>>


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
    kingPossibleMoves = checkKingAllowedMoves(col, row, pieces, chekker);

    console.log(kingPossibleMoves);
    // all the enemy pieces allowed moves
    let enemyPiecesAllowedMoves = getEachEnemyPieceAllowedMoves(pieces, enemyColor, chekker);

    console.log(enemyPiecesAllowedMoves);


    kingPossibleMoves.map((kingPossibleMove) => {
        if (!enemyPiecesAllowedMoves.includes(kingPossibleMove) &&
            pieces[kingPossibleMove]?.color !== enemyColor) {
            kingAllowedMoves.push(kingPossibleMove);
        }

    })

    if(checkMateType === 'double'){
        // if the case is double checkmate then there is no eat or block defenders !!
        let finalArray = Array.from(new Set(kingAllowedMoves))
        return finalArray
    }

    // <<<<<<<<==========================================  2- Eaten   ==========================================>>>>>>>>>>

    
    checkIfAttackerCouldBeEaten(attackerPiece, attackerCurrentSquare, pieces, enemyColor);

    // <<<<<<<<==========================================  3- Blocked   ==========================================>>>>>>>>>>
    console.log(enemyColor);
    checkIfCanAnyPieceBlock(attackerPiece, attackerCurrentSquare, currentKingSquare, pieces, enemyColor)




    let finalArray = Array.from(new Set(kingAllowedMoves))

    let filterdKingMoves = finalArray?.filter((item) => pieces[item] === undefined && !pieces[item]?.includes('9') && !pieces[item]?.includes('0') && !pieces[item]?.includes('-'))


    console.log(filterdKingMoves);
    resultObject = { ...checkMateAllowedMoves, 'king': filterdKingMoves, ...eatDefenders, ...blockDefenders }

    console.log(resultObject);

    return resultObject;


    //TODO: THIS FUNCTION MUST RETURN THE OBJECT OF THE ALLOWED MOVES IN THE CHECK-MATE CASE ;
    // TO BE RETURNED TO THE STATE IN CHESS BOARD COMPONENT TO SET THE ALLOWED MOVES AGAIN;;;;;;

}