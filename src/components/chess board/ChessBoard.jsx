//style sheet
import './styel.css';

//react
import { useEffect, useState } from 'react';

//component
import Piece from '../pieces/piece';

//redux
import { useDispatch, useSelector } from 'react-redux';

//action
import { UpdatePieces } from '../../redux/piecesReducer/actions';

//function
import { checkMovesForSinglePiece } from '../../functions/checkMovesSingle';

function ChessBoard() {
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const cols = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const [playerTurn, setPlayerTurn] = useState(true);
  const pieces = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [allowedMoves, setAllowedMoves] = useState([]);
  const [piecesTrash, setPiecesTrash] = useState([]);

  const checkPlayerTurn = (col, row) => {
    // check the player turn
    if (playerTurn === false && pieces[col + row]?.color === 'white') {
      return alert("It's the Black turn now");
    } else if (playerTurn === true && pieces[col + row]?.color === 'black') {
      return alert("It's the White turn now");
    }
  };

  function checkIfmoveAllowed(col, row) {
    console.log('from test function');
    const result = allowedMoves.find((move) => move === col + row);

    if (result) {
      return true;
    } else {
      return false;
    }
  }


  function handleMove(square, col, row) {
    // checkPlayerTurn(col, row); ///////////////////////// important function

    if (selectedPiece) {
      //check if the moves is allowed to let the piece move or not
      if (checkIfmoveAllowed(col, row)) {
        // create a new object with updated keys and values
        const updatedPieces = Object.keys(pieces).reduce((result, key) => {
          if (key === selectedPiece) {
            //get the eaten piece
            pieces[square] !== undefined && piecesTrash.push(pieces[square]);

            result[square] = pieces[selectedPiece];
          } else if (key !== square) {
            result[key] = pieces[key];
          }
          return result;
        }, {});
        dispatch(UpdatePieces(updatedPieces));
        setSelectedPiece(null);
        //switch the turns
        setPlayerTurn(!playerTurn);
      }
    } else {
      setAllowedMoves(
        checkMovesForSinglePiece(pieces[col + row], col, row, pieces)
      );
      setSelectedPiece(square);
    }
  }
  console.log(allowedMoves);

  const getPieceAt = (square) => {
    // Return the piece object for the given square to show it on the square
    return pieces[square];
  };

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
              {piece && <Piece color={piece.color} type={piece.type} />}
              {!piece && square}
            </div>
          );
        });
      })}
    </div>
  );
}

export default ChessBoard;
