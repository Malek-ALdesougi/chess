//style sheet
import './styel.css';

//react
import { useEffect, useRef, useState } from 'react';

//component
import Piece from '../pieces/piece';

//redux
import { useDispatch, useSelector } from 'react-redux';

//action
import { UpdatePieces, handleShortCastling } from '../../redux/piecesReducer/actions';

//functions
import { checkMovesForSinglePiece } from '../../functions/singlePieceMoves/checkMovesSingle';
import { checkPlayerTurn } from '../../functions/playerTurn/checkPlayerTurn';
import { checkIfmoveAllowed } from '../../functions/checkIfMoveAllowed/checkIfmoveAllowed';
import { AllowedMovesToEscapeCheckMate } from '../../functions/escapeCheckMate/AllowedMovesToEscapeCheckMate';
import { checkKingStatus } from '../../functions/kingStatus/checkKingStatus';
import { Notification } from '../toastifyAlert/toastify';

import { getStraightDirection } from '../../functions/DefenseKing/straightDirections/getStraightDefensebaleSquares';

let currentSquare;

function ChessBoard() {
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const cols = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const pieces = useSelector((state) => state);
  const dispatch = useDispatch();

  const [playerTurn, setPlayerTurn] = useState(true);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [allowedMoves, setAllowedMoves] = useState([]);
  const [piecesTrash, setPiecesTrash] = useState([]);
  const [isCheckMate, setIsCheckMate] = useState({white: false,black: false});
  const [currentPiece, setCurrentPiece] = useState({});
  const attackerPiece = useRef(null);
  const [attackerCurrentSquare, setAttackerCurrentSquare] = useState('');
  const [checkMateAllowedMoves, setCheckMateAllowedMoves] = useState({});
  const [isInitRender, setIsinitRender] = useState(true);

  let firstSelected = useRef({});
  let secondSelected = {};


  useEffect(() => {
    if (isInitRender) {
      setIsinitRender(false);
      return;
    } else {
      let enemyColor = currentPiece.color === 'white' ? 'black' : 'white';
      let kingCheckResult = checkKingStatus(pieces, enemyColor);
      
      if (kingCheckResult.isThereCheckMate === true) {
        //to access the updated isCheckMate state immediately
        let updatedIsCheckMate = {};
        if (currentPiece?.color === 'white') {
          updatedIsCheckMate = { ...isCheckMate, black: true };
        } else if (currentPiece?.color === 'black') {
          updatedIsCheckMate = { ...isCheckMate, white: true };
        }
        setIsCheckMate(updatedIsCheckMate);
        return setCheckMateAllowedMoves(
          AllowedMovesToEscapeCheckMate(updatedIsCheckMate, kingCheckResult?.attackersPieces, kingCheckResult?.attackerSquare, kingCheckResult?.kingCurrentSquare,pieces,kingCheckResult?.checkMateType));
      }
    }
  }, [pieces]);

  // this useEffect to handle the end game
  useEffect(() => {

    if (isCheckMate.black === true || isCheckMate.white === true) {
      let { king, ...defendersAndEaters } = checkMateAllowedMoves;

      if ((king?.length === 0 && Object.keys(defendersAndEaters)?.length === 0) || checkMateAllowedMoves?.length === 0) {
        // here we need to return the end game component !!
        return alert('Gggg');
      }
    }
  }, [isCheckMate]);

  useEffect(() => {
    attackerPiece.current = currentPiece;
  }, [currentPiece, isCheckMate]);

  function checkIfmoveAllowedForEscapeCheckMate(checkMateAllowedMoves,currentPiece,currentSquare,type) {

    let { king, ...defendersAndEaters } = checkMateAllowedMoves;
    let allow = false;

    if (type === 'king') {
      if (king?.length > 0) {
        allow = true;
      } else {
        allow = false;
      }
    } else {
    let checkDefendersAndEaters =  Object?.keys(defendersAndEaters).find((item) => {
      if(type + currentSquare === item){
        return true;
      }
    });
    if(checkDefendersAndEaters){
      allow = true;
    }
    }

    return allow;
  }


  const getPieceAt = (square) => {
    // Return the piece object for the given square to show it on the square
    return pieces[square];
  };

  function pieceNextStepAllowedMoves(col, row, pieces) {
    setAllowedMoves(checkMovesForSinglePiece(currentPiece, col, row, pieces));
  }


  function checkCastlingKingNewSquare(kingNewSquare, castlingType){

    console.log(castlingType); 
    let kingCol, kingRow = '';
    let isTherePiecesBetween = true;

    if(currentPiece?.color === 'white'){
      kingCol = '5';
      kingRow = '1';
      console.log('white king want to castle');
    }else{
      kingCol = '5';
      kingRow = '8';
      console.log('black king want to castle');
    }

    let concatedArray = [];
    Object.keys(pieces)?.map(sinlgePiece => {
        if (pieces[sinlgePiece]?.color !== currentPiece?.color) {
            if (pieces[sinlgePiece]?.type !== 'king') {
                concatedArray = [...concatedArray, ...checkMovesForSinglePiece(pieces[sinlgePiece], sinlgePiece[0], sinlgePiece[1], pieces)];
            }
        }
    })
    let filteredArray = concatedArray?.filter(item => !item.includes('0') && !item.includes('9') && item.length <= 2);
    let foundInEnemyAllowedMoves = filteredArray.some((item) => item === kingNewSquare);

    console.log(foundInEnemyAllowedMoves);

    if(castlingType === 'short'){

      if(pieces[(parseInt(kingCol) + 1) + kingRow] === undefined && pieces[(parseInt(kingCol) + 2) + kingRow] === undefined){
        console.log('there is no pieces between short');
        isTherePiecesBetween = false;
      }
    }else if(castlingType === 'long'){
      if(pieces[(parseInt(kingCol) - 1) + kingRow] === undefined 
      && pieces[(parseInt(kingCol) - 2) + kingRow] === undefined
      && pieces[(parseInt(kingCol) - 3) + kingRow] === undefined){
        console.log('there is no pieces between long');
        isTherePiecesBetween = false;
      }
    }

    
    console.log(foundInEnemyAllowedMoves)
    console.log(isTherePiecesBetween);

    if(foundInEnemyAllowedMoves || isTherePiecesBetween){
      //return false if the square founded in the enemy pieces allowed moves
      console.log('returned from the first if');
      return false;
    }else if(!foundInEnemyAllowedMoves && !isTherePiecesBetween){
      return true;
    }else{
      return false;
    }

  }

  function castling(){
    // checka mate === false; ============== DONE
    // both pices must not moved at all; ================== DONE
    //the new king square must not be under attack ==================== DONE

    // ====================================        HANDLE SHORT CASTLING LOGIC   =============================================

      if(((pieces[firstSelected.current]?.type === 'king' && pieces[secondSelected]?.type === 'rook' 
      && (pieces[firstSelected.current]?.color === pieces[secondSelected]?.color === currentPiece?.color)  
      && firstSelected.current ===  currentPiece?.color === 'white' ? '51' : '58' && secondSelected === currentPiece?.color === 'white'? '81' : '88')) 
      ||
       (pieces[firstSelected.current]?.type === 'rook' && pieces[secondSelected]?.type === 'king' 
      && (pieces[firstSelected.current]?.color === pieces[secondSelected]?.color === currentPiece?.color)  
      && firstSelected.current === currentPiece?.color === 'white' ? '81' : '88' && secondSelected === currentPiece?.color === 'white' ? '51' : '58')){

        if(((pieces[secondSelected]?.type === 'rook' && secondSelected === '81') || (pieces[firstSelected.current]?.type === 'rook' && firstSelected.current === '81')) ||
        ((pieces[secondSelected]?.type === 'rook' && secondSelected === '88') || (pieces[firstSelected.current]?.type === 'rook' && firstSelected.current === '88'))){
         

         
          console.log('it defently short castling');


          if(isCheckMate.black === false && isCheckMate.white === false){
  
            if(checkCastlingKingNewSquare(currentPiece?.color === 'white' ? '71': '78', 'short')){
              console.log(firstSelected.current);
              console.log(secondSelected);

              // currentPiece?.color === 'white' ? handleShortCastling('white'):handleShortCastling('black');
              handleShortCastling(firstSelected.current, secondSelected)

              console.log('valid ....he want to do the castling right rook');
            }else{
              console.log('not valid castling');
            }
          }


        }


      }

    // ====================================        HANDLE LONG CASTLING LOGIC   =============================================
      
      if(((pieces[firstSelected.current]?.type === 'rook' && pieces[secondSelected]?.type === 'king' 
      && (pieces[firstSelected.current]?.color === pieces[secondSelected]?.color === currentPiece?.color) 
      && secondSelected === (currentPiece?.color === 'white' ? '51' : '58')) && firstSelected.current === currentPiece?.color === 'white'? '11' : '18') 
      ||
      ((pieces[firstSelected.current]?.type === 'king' && pieces[secondSelected]?.type === 'rook' 
      && (pieces[firstSelected.current]?.color === pieces[secondSelected]?.color === currentPiece?.color) 
      && secondSelected === currentPiece?.color === 'white' ? '11': '18') && firstSelected.current === currentPiece?.color === 'white' ? '51' : '58')){

        if(((pieces[secondSelected]?.type === 'rook' && secondSelected === '11') || (pieces[firstSelected.current]?.type === 'rook' && firstSelected.current === '11')) ||
        ((pieces[secondSelected]?.type === 'rook' && secondSelected === '18') || (pieces[firstSelected.current]?.type === 'rook' && firstSelected.current === '18'))){
          
          
          console.log("It's defenitly long castling !!");

          if(isCheckMate.black === false && isCheckMate.white === false){
  
            if(checkCastlingKingNewSquare( currentPiece?.color === 'white' ? '31': '38', 'long')){

              console.log(firstSelected);
              console.log(secondSelected);
  
              console.log('valid ....he want to do the castling left rook');
            }else{
              console.log('not valid castling');
            }
          }

        }

      }

      


  }

  function firstSelectedPiece(col, row, square) {

    firstSelected.current = col + row;
    
    console.log(firstSelected.current);
    // to handle the undefined selsected piece
    if(pieces[col + row] === undefined){
      return
    }

    if (checkPlayerTurn(col, row, playerTurn, pieces)) {
      setAllowedMoves(checkMovesForSinglePiece(pieces[col + row],col,row,pieces,isCheckMate));
      setSelectedPiece(square);
      currentSquare = square;
      setCurrentPiece(pieces[square]);
      if (isCheckMate.black === true || isCheckMate.white === true) {
        console.log(isCheckMate);

        console.log(checkMateAllowedMoves);
        console.log('============== anything ============');

        let test = checkIfmoveAllowedForEscapeCheckMate( checkMateAllowedMoves, currentPiece, currentSquare, pieces[square].type);
        if (test) {
          setSelectedPiece(square);
          setCurrentPiece(pieces[square]);
        } else {
          setSelectedPiece(null);
          setCurrentPiece({});
          Notification("It's Check Mate, Choose a valid piece to play !!", 'red')
        }
      }
    }
  }

  function handleMove(square, col, row) {
    if (selectedPiece) {
      secondSelected = col + row;
      console.log(secondSelected);

      castling();
      // allow the player to choose another piece to play
      if (pieces[square]?.color === pieces[selectedPiece]?.color) {
        firstSelectedPiece(col, row, square);
        return setAllowedMoves(
          checkMovesForSinglePiece(pieces[col + row], col, row, pieces)
        );
      }

      if (checkIfmoveAllowed(col, row, allowedMoves, isCheckMate, checkMateAllowedMoves, currentPiece, currentSquare, playerTurn, pieces)) {
        setIsCheckMate((prev)=> (  { white:currentPiece.color==='white'? false:prev.white, black: currentPiece.color==='black'? false:prev.black }));

        if (pieces[selectedPiece]?.type === 'pawn') {
          pieces[selectedPiece].basePostion = false;
        }

        // create a new object with updated keys and values
        const updatedPieces = Object.keys(pieces).reduce((result, key) => {
          if (key === selectedPiece) {
            //get the eaten piece
            pieces[square] !== undefined && piecesTrash.push(pieces[square]);
            setAttackerCurrentSquare(square);
            // know the last square the piece moved too. to check the new available moves immediatly
            pieceNextStepAllowedMoves(col, row, pieces);
            result[square] = pieces[selectedPiece];
          } else if (key !== square) {
            result[key] = pieces[key];
          }
          return result;
        }, {});
        dispatch(UpdatePieces(updatedPieces));
        setPlayerTurn(!playerTurn);
        setSelectedPiece(null);
        setCheckMateAllowedMoves({});
      }
    } else {
      firstSelectedPiece(col, row, square);
    }
  }

  console.log(allowedMoves);

  return (
    <div className="board">
      {rows.map((row) => {
        return cols.map((col) => {
          const square = col + row;
          const isBlackSquare =
            (cols.indexOf(col) + rows.indexOf(row)) % 2 === 1;
          const piece = getPieceAt(square);

          return (
            <div key={square} id={square} className={`square ${isBlackSquare ? 'black' : 'white'}`} onClick={() => handleMove(square, col, row)}>
              {piece && (<Piece tabIndex="-1" color={piece?.color} type={piece.type} /> )}
              {!piece && square}
            </div>
          );
        });
      })}
    </div>
  );

  
}

export default ChessBoard;
