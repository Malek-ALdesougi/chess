// Reuse checkMovesForSinglePiece
import { checkMovesForSinglePiece } from "./checkMovesSingle";


const checkMateAllowedMoves = {};
let kingPossibleMoves = [];
let kingAllowedMoves = [];
let defenders = {}


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

function getEachEnemyPieceAllowedMoves(pieces, enemyColor) {

    let concatedArray = [];
    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color === enemyColor) {
            // get all the allowed moves for all the enemy pieces ;
            concatedArray = [...concatedArray, ...checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces)];
        }
    });
    let filteredArray = concatedArray?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    return filteredArray;
}

function getFriedlyPiecesAllowedMoves(pieces, enemyColor, attackerCurrentSquare) {


    let concatedArrayTow = [];
    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color !== enemyColor) {
            // get all the allowed moves for all the enemy pieces ;
            let singlePieceAllowedMoves = checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces);
            // store the defenders in a new object
            if (singlePieceAllowedMoves.includes(attackerCurrentSquare)) {
                defenders = { ...defenders, [pieces[sinlgePiece]?.type]: attackerCurrentSquare }
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


const checkIfCanAnyPieceBlock = (attackerPiece, attackerCurrentSquare, currentKingSquare, pieces) => {

    //need to check if i can move any of my pieces to be in the attacker allowed moves to block him

    // When want to block ---> the attacker only could be (queen, bishop, pawn, rook)


    console.log(currentKingSquare + " " + attackerCurrentSquare);

    //rook attack logic
    if (Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) > Number(currentKingSquare[1])) {
        console.log('its top right');
    } else if (Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) < Number(currentKingSquare[1])) {
        console.log('its bottom left');
        // }else if(Number(attackerCurrentSquare[0]) > Number(currentKingSquare[0]) && Number(attackerCurrentSquare[1]) < Number(currentKingSquare[1])) {
        console.log('its bottom left');
    }
    // else{
    //     console.log('its to the left');
    // }


    // if(Number(currentKingSquare[1]) < Number(attackerCurrentSquare[1])){
    //     console.log('its to the top');
    // }

}






export const AllowedMovesToEscapeCheckMate = (isCheckMate, attackerPiece, attackerCurrentSquare, currentKingSquare, pieces) => {

    // <<<<<<<<<==========================================  1   ==========================================>>>>>>>>>>

    // rest the variable :

    let resultObject = {};

    let enemyColor;
    if (isCheckMate.white === true) {
        enemyColor = 'black';
    } else if (isCheckMate.black === true) {
        enemyColor = 'white';
    }
    let col = currentKingSquare[0];
    let row = currentKingSquare[1];

    // the checked king possible moves
    kingPossibleMoves = checkKingAllowedMoves(col, row, pieces);
    // all the enemy pieces allowed moves
    let enemyPiecesAllowedMoves = getEachEnemyPieceAllowedMoves(pieces, enemyColor);

    kingPossibleMoves.map((kingPossibleMove) => {
        if (!enemyPiecesAllowedMoves.includes(kingPossibleMove) &&
            pieces[kingPossibleMove]?.color !== enemyColor &&
            !kingPossibleMove.includes('0')) {
            kingAllowedMoves.push(kingPossibleMove);
        }

    })

    // <<<<<<<<==========================================  2   ==========================================>>>>>>>>>>


    checkIfAttackerCouldBeEaten(attackerPiece, attackerCurrentSquare, pieces, enemyColor);


    checkIfCanAnyPieceBlock(attackerPiece, attackerCurrentSquare, currentKingSquare, pieces)




    let finalArray = Array.from(new Set(kingAllowedMoves))

    resultObject = { ...checkMateAllowedMoves, 'king': finalArray, ...defenders }

    return resultObject;


    //TODO: THIS FUNCTION MUST RETURN THE OBJECT OF THE ALLOWED MOVES IN THE CHECK-MATE CASE ;
    // TO BE RETURNED TO THE STATE IN CHESS BOARD COMPONENT TO SET THE ALLOWED MOVES AGAIN;;;;;;

}