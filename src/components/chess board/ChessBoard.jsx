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
  const [moveNumber, setMoveNumber] = useState(0);
  const [move, setMove] = useState({ from: '', to: '' });
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [allowedMoves, setAllowedMoves] = useState([]);


  // function handleOperations(str1, str2, operator) {
  //   const num1 = parseInt(str1);
  //   const num2 = parseInt(str2);
  //   let result = num1 + num2;

  // if (operator === '+') {
  //   result = num1 + num2;
  // } else if (operator === '-') {
  //   result = num1 - num2;
  // } else {
  //   return 'Invalid operator';
  // }

  // return result.toString();
  // }


  // function checkMovesForSinglePiece(thePiece, currentCol, currentRow) {
 
  //   console.log(typeof(currentCol));
  //   switch (thePiece?.type) {
  //     case 'pawn':
  //       allowedMoves.push(
  //         `${eval(currentCol+'1') }`+`${eval(currentCol+'1') }`,
  //         // handleOperations(currentCol, '1', '+') + handleOperations(currentRow, '1', '+'), 
  //         currentCol + `${eval(`${currentRow} + 2`)}`,
  //       //  currentCol + handleOperations(currentRow, '2', '+'), 
  //       `${eval()}`
  //        handleOperations(currentCol, '1', '-') + handleOperations(currentRow, '1', '+'));
  //       // allowedMoves
  //       //the pawn can't move forward at all if there any pieces
  //       if (pieces[currentCol + eval(`${currentRow} + 1`)] !== undefined) {
  //         return setAllowedMoves();
  //       } else if (thePiece.color === 'white' && thePiece.basePostion) {
  //         return allowedMoves.push(currentCol + eval(`${currentRow} + 1`), currentCol + eval(`${currentRow} + 2`));
  //       } else {
  //         return allowedMoves.push(currentCol + eval(`${currentRow} + 1`));
  //       }

  //     default:
  //       return;
  //   }

  //   // console.log(thePiece);
  //   // console.log(currentCol);
  //   // console.log(currentRow);
  // }

  function testFunction(col, row) {
    // console.log(col);
    // console.log(row);
  }

  const checkAllowedMoves = (piece, targetSquare) => {
    if (pieces[targetSquare] !== undefined) {
      // check if the target square contian friendly piece or enemy peice;
      if (pieces[targetSquare]?.color === piece?.color) {
        return false;
      }
    }
    return true;
  };

  function handleMove(square, col, row) {
    if (selectedPiece && checkAllowedMoves(pieces[selectedPiece], square)) {
      console.log('target row ' + row);
      console.log('target col ' + col);
      chnageMoveNumber(2, square);

      //function to determine whether to move the piece or not to the target position
      testFunction(col, row);

      // create a new object with updated keys and values
      const updatedPieces = Object.keys(pieces).reduce((result, key) => {
        if (key === selectedPiece) {
          //get the eaten piece
          console.log(pieces[square]);

          result[square] = pieces[selectedPiece];
        } else if (key !== square) {
          result[key] = pieces[key];
        }
        return result;
      }, {});

      dispatch(UpdatePieces(updatedPieces));
      setSelectedPiece(null);
    } else {
      setAllowedMoves(checkMovesForSinglePiece(pieces[col + row], col, row, pieces));
      console.log(allowedMoves);
      chnageMoveNumber(1, square);
      setSelectedPiece(square);
    }
  }
  console.log(allowedMoves);

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
