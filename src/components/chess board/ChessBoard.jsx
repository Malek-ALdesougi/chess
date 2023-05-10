import './styel.css'

function ChessBoard() {
  return (
    <div className='board'>
      {Array(64)
        .fill()
        .map((k, i) => (
          <div
            key={i}
            className={`square ${i % 2 === Math.floor(i / 8) % 2 ? 'black' : 'white'}`}
          />
        ))}
    </div>
  );
}

export default ChessBoard;
