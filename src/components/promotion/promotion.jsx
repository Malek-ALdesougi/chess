import Piece from '../pieces/piece';
import "./style.css"
function Promotion({couldBePromoted, promotionType, pieceColor}) {

    // couldBePromoted={setCouldBePromoted} promotionType={setPromotionType} color={currentPiece?.color}
  let promotionTypes = ['queen', 'knight', 'rook', 'bishop'];

  //need to change the promotionType 

  console.log(promotionType);
  console.log(pieceColor);
  console.log(couldBePromoted);

  function handleClick(piece){
      promotionType(piece)
      couldBePromoted(false)
  }

  return (
    <div  className='promotion'>
      {promotionTypes?.map((piece) => (
        <>
          {/* <input type="hidden" id="input" defaultValue={piece}/> */}
          < span  onClick={() => handleClick(piece)}>
            <Piece color={pieceColor} type={piece} />
          </span>
        </>
      ))}
    </div>
  );
}

export default Promotion;
