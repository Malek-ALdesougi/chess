import './style.css'

function Piece({ color, type }) {
  return <>
  <img src={`images/${color}/${type}.svg`} className={`piece ${color} ${type}`} alt='fdf'/>;
  </>
}

export default Piece;
