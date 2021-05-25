const BLACK_CLASS = 'b';
const WHITE_CLASS = 'w';

const board = document.getElementById('board');
const spaces = board.querySelectorAll('div.space');
const l_edge_spaces = [0, 8, 16, 24, 32, 40, 48, 56];
const r_edge_spaces = [7, 15, 23, 31, 39, 47, 55, 63];
const u_edge_spaces = [0, 1, 2, 3, 4, 5, 6, 7];
const d_edge_spaces = [56, 57, 58, 59, 60, 61, 62, 63];

let whiteTurn = false;

startGame();

function startGame() {
  spaces.forEach(i => {
    i.removeEventListener('click', handleClick);
    i.addEventListener('click', handleClick, {once: true});
  });
  return;
}

function handleClick(e) {
  const spot = e.target;
  addDisk(spot);
  swapTurn();
  calcLegalPositions();
  return;
}

function addDisk(space) {
  space.classList.add('placed');
  if(whiteTurn)
    space.classList.add('w');
  else
    space.classList.add('b');
  return;
}

function swapTurn() {
  whiteTurn = !whiteTurn;
  board.classList.remove('b');
  board.classList.remove('w');
  if(whiteTurn)
    board.classList.add('w');
  else
    board.classList.add('b');
  return;
}

function calcLegalPositions() {
  spaces.filter(space => {space.classList.includes('placed')}).forEach((space, i) => {
    console.log(i);
  });

}

function calcExistingSpaces() {

}
