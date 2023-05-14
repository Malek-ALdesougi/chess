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

function ChessBoard() {
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const [playerTurn, setPlayerTurn] = useState(true);
  const pieces = useSelector((state) => state);
  const dispatch = useDispatch();
  const [moveNumber, setMoveNumber] = useState(0);
  const [move, setMove] = useState({ from: '', to: '' });
  const [selectedPiece, setSelectedPiece] = useState(null);

  function handleMove(square) {
    if (selectedPiece) {
      chnageMoveNumber(2, square);
      // create a new object with updated keys and values
      const updatedPieces = Object.keys(pieces).reduce((result, key) => {
        if (key === selectedPiece) {
          result[square] = pieces[selectedPiece];
        } else if (key !== square) {
          result[key] = pieces[key];
        }
        return result;
      }, {});

      dispatch(UpdatePieces(updatedPieces));
      setSelectedPiece(null);
    } else {
      chnageMoveNumber(1, square);
      setSelectedPiece(square);
    }
  }

  function chnageMoveNumber(num, square) {
    // handle the number of moves available for each turn to the user
    if (num === 1) {
      setMoveNumber(1);
      setSelectedPiece(square);
      setMove({ ...move, from: square });
    } else if (num === 2) {
      setMove({ ...move, to: square });
      setPlayerTurn(!playerTurn);
      setMoveNumber(0);
    }
  }

  // to rest the moves object for each player trun
  useEffect(() => {
    setMove({ from: '', to: '' });
  }, [playerTurn]);

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
              onClick={() => handleMove(square)}
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
