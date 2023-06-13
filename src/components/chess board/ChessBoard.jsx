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
  // const [isWhiteCheckMate, setIsWhiteCheckMate] = useState(false)
  // const [isBlackCheckMate, setIsBlackCheckMate] = useState(false)
  const [isCheckMate, setIsCheckMate] = useState({
    white: false,
    black: false,
  });
  const [currentPiece, setCurrentPiece] = useState({});
  const attackerPiece = useRef(null);
  const [attackerCurrentSquare, setAttackerCurrentSquare] = useState('');
  const [checkMateAllowedMoves, setCheckMateAllowedMoves] = useState({});
  const [isInitRender, setIsinitRender] = useState(true);

  function checkIfmoveAllowedForEscapeCheckMate(
    checkMateAllowedMoves,
    currentPiece,
    currentSquare,
    type
  ) {
    let { king, ...defendersAndEaters } = checkMateAllowedMoves;
    let allow = false;

    if (type === 'king') {
      if (king.length > 0) {
        allow = true;
      } else {
        allow = false;
      }
    } else {
      Object.keys(defendersAndEaters).map((item) => {
        if (item === type + currentSquare) {
          allow = true;
        } else {
          allow = false;
        }
      });
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

  useEffect(() => {
    if (isCheckMate.black === true || isCheckMate.white === true) {
      console.log(checkMateAllowedMoves);
      let { king, ...defendersAndEaters } = checkMateAllowedMoves;
      if (king.length === 0 && Array.from(defendersAndEaters).length === 0) {
        return alert('Gggg');
      }
    }

    if (isInitRender) {
      setIsinitRender(false);
      return;
    } else {
      let enemyColor = currentPiece.color === 'white' ? 'black' : 'white';
      let kingCheckResult = checkKingStatus(pieces, enemyColor);
      // every time the pieces get changed we need to check the king status
      // IN THIS USeEFFECT WE NEED TO CHECK THE OPPOSITE KING STATUS AFTER EACH ROUND

      if (kingCheckResult.isThereCheckMate === true) {
        //to access the updated isCheckMate state immediately
        let updatedIsCheckMate = {};

        console.log('there is a check mate');
        if (currentPiece?.color === 'white') {
          updatedIsCheckMate = { ...isCheckMate, black: true };
        } else if (currentPiece?.color === 'black') {
          updatedIsCheckMate = { ...isCheckMate, white: true };
        }

        console.log(
          '=================== we cant change the checkmate unless the condition is true =================='
        );
        setIsCheckMate(updatedIsCheckMate);

        // TODO: we must check if isCheckmate or not to deciede check allowed moves on what the array OR the object
        return setCheckMateAllowedMoves(
          AllowedMovesToEscapeCheckMate(
            updatedIsCheckMate,
            kingCheckResult?.attackersPieces,
            kingCheckResult?.attackerSquare,
            kingCheckResult?.kingCurrentSquare,
            pieces,
            kingCheckResult?.checkMateType
          )
        );
      }
    }
  }, [pieces, isCheckMate]);

  useEffect(() => {
    attackerPiece.current = currentPiece;
  }, [currentPiece, isCheckMate]);

  function handleMove(square, col, row) {
    let firstPick = square;
    if (selectedPiece) {
      // allow the player to choose another piece to play
      if (pieces[square]?.color === pieces[selectedPiece]?.color) {
        // setSelectedPiece(firstPick);
        firstSelectedPiece(col, row, square);
        return setAllowedMoves(
          checkMovesForSinglePiece(pieces[col + row], col, row, pieces)
        );
      }

      //TODO:  WE HAVE SOME IMPORTANT WORK HERE !!!
      console.log(isCheckMate);

      console.log(
        checkIfmoveAllowed(
          col,
          row,
          allowedMoves,
          isCheckMate,
          checkMateAllowedMoves,
          currentPiece,
          currentSquare
        )
      );

      if (
        checkIfmoveAllowed(
          col,
          row,
          allowedMoves,
          isCheckMate,
          checkMateAllowedMoves,
          currentPiece,
          currentSquare
        )
      ) {
        setIsCheckMate({ white: false, black: false });

        if (pieces[selectedPiece]?.type === 'pawn') {
          pieces[selectedPiece].basePostion = false;
        }

        // create a new object with updated keys and values
        const updatedPieces = Object.keys(pieces).reduce((result, key) => {
          if (key === selectedPiece) {
            //get the eaten piece
            pieces[square] !== undefined && piecesTrash.push(pieces[square]);
            console.log('Attacker current square : ' + square);
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
            <div
              tabIndex="-1"
              key={square}
              id={square}
              className={`square ${isBlackSquare ? 'black' : 'white'}`}
              onClick={() => handleMove(square, col, row)}
            >
              {piece && (
                <Piece tabIndex="-1" color={piece?.color} type={piece.type} />
              )}
              {!piece && square}
            </div>
          );
        });
      })}
    </div>
  );

  function firstSelectedPiece(col, row, square) {
    if (checkPlayerTurn(col, row, playerTurn, pieces)) {
      setAllowedMoves(
        checkMovesForSinglePiece(
          pieces[col + row],
          col,
          row,
          pieces,
          isCheckMate
        )
      );
      setSelectedPiece(square);
      currentSquare = square;
      setCurrentPiece(pieces[square]);
      if (isCheckMate.black === true || isCheckMate.white === true) {
        console.log(isCheckMate);

        console.log(checkMateAllowedMoves);
        console.log('============== anything ============');

        let test = checkIfmoveAllowedForEscapeCheckMate(
          checkMateAllowedMoves,
          currentPiece,
          currentSquare,
          pieces[square].type
        );
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
}

export default ChessBoard;
