import Piece from '../pieces/piece';
import { useEffect, useState } from 'react';
import './styel.css';

function ChessBoard() {
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const [pieces, setPieces] = useState({
    a1: { color: 'white', type: 'rook', allowdMoves: {} },
    b1: { color: 'white', type: 'knight', allowdMoves: {} },
    c1: { color: 'white', type: 'bishop', allowdMoves: {} },
    d1: { color: 'white', type: 'queen', allowdMoves: {} },
    e1: { color: 'white', type: 'king', allowdMoves: {} },
    f1: { color: 'white', type: 'bishop', allowdMoves: {} },
    g1: { color: 'white', type: 'knight', allowdMoves: {} },
    h1: { color: 'white', type: 'rook', allowdMoves: {} },
    a2: { color: 'white', type: 'pawn', allowdMoves: {} },
    b2: { color: 'white', type: 'pawn', allowdMoves: {} },
    c2: { color: 'white', type: 'pawn', allowdMoves: {} },
    d2: { color: 'white', type: 'pawn', allowdMoves: {} },
    e2: { color: 'white', type: 'pawn', allowdMoves: {} },
    f2: { color: 'white', type: 'pawn', allowdMoves: {} },
    g2: { color: 'white', type: 'pawn', allowdMoves: {} },
    h2: { color: 'white', type: 'pawn', allowdMoves: {} },
    a8: { color: 'black', type: 'rook', allowdMoves: {} },
    b8: { color: 'black', type: 'knight', allowdMoves: {} },
    c8: { color: 'black', type: 'bishop', allowdMoves: {} },
    d8: { color: 'black', type: 'queen', allowdMoves: {} },
    e8: { color: 'black', type: 'king', allowdMoves: {} },
    f8: { color: 'black', type: 'bishop', allowdMoves: {} },
    g8: { color: 'black', type: 'knight', allowdMoves: {} },
    h8: { color: 'black', type: 'rook', allowdMoves: {} },
    a7: { color: 'black', type: 'pawn', allowdMoves: {} },
    b7: { color: 'black', type: 'pawn', allowdMoves: {} },
    c7: { color: 'black', type: 'pawn', allowdMoves: {} },
    d7: { color: 'black', type: 'pawn', allowdMoves: {} },
    e7: { color: 'black', type: 'pawn', allowdMoves: {} },
    f7: { color: 'black', type: 'pawn', allowdMoves: {} },
    g7: { color: 'black', type: 'pawn', allowdMoves: {} },
    h7: { color: 'black', type: 'pawn', allowdMoves: {} },
  });

  const [playerTurn, setPlayerTurn] = useState(true);

  const [moveNumber, setMoveNumber] = useState(0);
  const [move, setMove] = useState({ from: '', to: '' });
  const [selectedPiece, setSelectedPiece] = useState(null);

  function handleMove(square) {
    if (selectedPiece) {
      // create a new object with updated keys and values
      const updatedPieces = Object.keys(pieces).reduce((result, key) => {
        if (key === selectedPiece) {
          result[square] = pieces[selectedPiece];
        } else if (key !== square) {
          result[key] = pieces[key];
        }
        return result;
      }, {});

      setPieces(updatedPieces);
      setSelectedPiece(null);
    } else {
      setSelectedPiece(square);
    }

    // handle the number of moves available for each turn to the user
    if (moveNumber === 0) {
      setSelectedPiece(square);
      setMoveNumber(1);
      setMove({ ...move, from: square });
    } else if (moveNumber === 1) {
      setMove({ ...move, to: square });
      setMoveNumber(0);
      setPlayerTurn(!playerTurn);
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
