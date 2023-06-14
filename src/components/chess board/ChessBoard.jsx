//style sheet
import './styel.css';

//react
import { useEffect, useRef, useState } from 'react';

//component
import Piece from '../pieces/piece';

//redux
import { useDispatch, useSelector } from 'react-redux';

//action
import { UpdatePieces } from '../../redux/piecesReducer/actions';

//functions
import { checkMovesForSinglePiece } from '../../functions/checkMovesSingle';
import { checkPlayerTurn } from '../../functions/checkPlayerTurn';
import { checkIfmoveAllowed } from '../../functions/checkIfmoveAllowed';
import { AllowedMovesToEscapeCheckMate } from '../../functions/AllowedMovesToEscapeCheckMate';
import { checkKingStatus } from '../../functions/kingStatus/checkKingStatus';

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


  useEffect(() => {
    if (isInitRender) {
      setIsinitRender(false);
      return;
    } else {
      let enemyColor = currentPiece.color === 'white' ? 'black' : 'white';
      let kingCheckResult = checkKingStatus(pieces, enemyColor);

      console.log(kingCheckResult.isThereCheckMate);


      console.log(isCheckMate);

      
      if (kingCheckResult.isThereCheckMate === true) {
        console.log('Is check mate get updated');
        //to access the updated isCheckMate state immediately
        let updatedIsCheckMate = {};
        if (currentPiece?.color === 'white') {
          updatedIsCheckMate = { ...isCheckMate, black: true };
        } else if (currentPiece?.color === 'black') {
          updatedIsCheckMate = { ...isCheckMate, white: true };
        }

        console.log(
          '=================== we cant change the checkmate unless the condition is true =================='
        );
        setIsCheckMate(updatedIsCheckMate);

        console.log(kingCheckResult?.checkMateType);

        console.log(AllowedMovesToEscapeCheckMate(updatedIsCheckMate, kingCheckResult?.attackersPieces, kingCheckResult?.attackerSquare, kingCheckResult?.kingCurrentSquare,pieces,kingCheckResult?.checkMateType));

        return setCheckMateAllowedMoves(
          AllowedMovesToEscapeCheckMate(updatedIsCheckMate, kingCheckResult?.attackersPieces, kingCheckResult?.attackerSquare, kingCheckResult?.kingCurrentSquare,pieces,kingCheckResult?.checkMateType));
      }
    }
  }, [pieces]);

  // this useEffect to handle the end game
  useEffect(() => {

    console.log(checkMateAllowedMoves);

    if (isCheckMate.black === true || isCheckMate.white === true) {
      let { king, ...defendersAndEaters } = checkMateAllowedMoves;

      console.log(king);
      console.log(defendersAndEaters);
      console.log(checkMateAllowedMoves);

      console.log(isCheckMate);

      if ((king?.length === 0 && Object.keys(defendersAndEaters)?.length === 0) || checkMateAllowedMoves?.length === 0) {
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

  //TODO: handle when the uesr first click on undefiend square -----> the game is get craches;

  const getPieceAt = (square) => {
    // Return the piece object for the given square to show it on the square
    return pieces[square];
  };

  function pieceNextStepAllowedMoves(col, row, pieces) {
    setAllowedMoves(checkMovesForSinglePiece(currentPiece, col, row, pieces));
  }


  function firstSelectedPiece(col, row, square) {


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
          alert('choose a valid piece to play noob !!');
        }
      }
    }
  }

  function handleMove(square, col, row) {
    if (selectedPiece) {
      // allow the player to choose another piece to play
      if (pieces[square]?.color === pieces[selectedPiece]?.color) {
        firstSelectedPiece(col, row, square);
        return setAllowedMoves(
          checkMovesForSinglePiece(pieces[col + row], col, row, pieces)
        );
      }

      if (checkIfmoveAllowed(col, row, allowedMoves, isCheckMate, checkMateAllowedMoves, currentPiece, currentSquare)) {
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
