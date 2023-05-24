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

function ChessBoard() {
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const cols = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const pieces = useSelector((state) => state);
  const dispatch = useDispatch();

  const [playerTurn, setPlayerTurn] = useState(true);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [allowedMoves, setAllowedMoves] = useState([]);
  const [piecesTrash, setPiecesTrash] = useState([]);
  const [isCheckMate, setIsCheckMate] = useState({
    white: false,
    black: false,
  });
  const [currentPiece, setCurrentPiece] = useState({});
  const attackerPiece = useRef(null);
  const [attackerCurrentSquare, setAttackerCurrentSquare] = useState('');
  const [checkMateAllowedMoves, setCheckMateAllowedMoves] = useState({});

  //TODO: handle when the uesr first click on undefiend square -----> the game is get craches;

  const getPieceAt = (square) => {
    // Return the piece object for the given square to show it on the square
    return pieces[square];
  };

  function pieceNextStepAllowedMoves(col, row, pieces) {
    setAllowedMoves(checkMovesForSinglePiece(currentPiece, col, row, pieces));
  }

  useEffect(() => {
    attackerPiece.current = currentPiece;
  }, [currentPiece, isCheckMate]);

  useEffect(() => {
    allowedMoves.map((move) => {
      if (
        pieces[move]?.type === 'king' &&
        pieces[move]?.color !== currentPiece?.color
      ) {
        currentPiece?.color === 'white'
          ? (isCheckMate.black = true)
          : (isCheckMate.white = true);
        // check mate
        console.log(move + ' is the current king square');
        // TODO: we must check if isCheckmate or not to deciede check allowed moves on what the array OR the object
        setCheckMateAllowedMoves(
          AllowedMovesToEscapeCheckMate(
            isCheckMate,
            attackerPiece.current,
            attackerCurrentSquare,
            move,
            pieces
          )
        );
      }
    });
  }, [isCheckMate, pieces]);

  console.log(checkMateAllowedMoves);

  function handleMove(square, col, row) {
    let firstPick = square;
    if (selectedPiece) {
      // allow the player to choose another piece to play
      if (pieces[square]?.color === pieces[selectedPiece]?.color) {
        setSelectedPiece(firstPick)
       return setAllowedMoves(checkMovesForSinglePiece(pieces[col + row], col, row, pieces));
         
      }

      //check if the moves is allowed to let the piece move or not
      // and also check if the current setuation is checkMate or not
      // because the allowed moves will be deferent in checkMate case

      //TODO:  WE HAVE SOME IMPORTANT WORK HERE !!!
      if (checkIfmoveAllowed(col, row, allowedMoves)) {
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
        //switch the turns
        setPlayerTurn(!playerTurn);
        setSelectedPiece(null);
      }
    } else {
      if (checkPlayerTurn(col, row, playerTurn, pieces)) {
        setAllowedMoves(
          checkMovesForSinglePiece(pieces[col + row], col, row, pieces, isCheckMate)
        );
        setSelectedPiece(square);
        setCurrentPiece(pieces[square]);
      }
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
              key={square}
              id={square}
              className={`square ${isBlackSquare ? 'black' : 'white'}`}
              onClick={() => handleMove(square, col, row)}
            >
              {piece && <Piece color={piece?.color} type={piece.type} />}
              {!piece && square}
            </div>
          );
        });
      })}
    </div>
  );
}

export default ChessBoard;
