const BLACK_CLASS = 'b';
const WHITE_CLASS = 'w';
const PLACED_CLASS = 'placed';
const ILLEGAL_CLASS = 'illegal';

const board = document.getElementById('board');
const spaces = board.querySelectorAll('div.space');
const reset_btn = document.getElementById('restart-btn');
const l_edge_spaces = [0, 8, 16, 24, 32, 40, 48, 56];
const r_edge_spaces = [7, 15, 23, 31, 39, 47, 55, 63];
const u_edge_spaces = [0, 1, 2, 3, 4, 5, 6, 7];
const d_edge_spaces = [56, 57, 58, 59, 60, 61, 62, 63];

const upLeftId = 0;
const upMidId = 1;
const upRightId = 2;
const rightMidId = 3;
const lowRightId = 4;
const lowMidId = 5;
const lowLeftId = 6;
const leftMidId = 7;

let whiteTurn = false;

reset_btn.addEventListener('click', startGame);
startGame();

function startGame() {
  whiteTurn = false;
  spaces.forEach((obj, index) => {

    //Remove any previous placement classes
    obj.classList.remove('placed');
    obj.classList.remove(WHITE_CLASS);
    obj.classList.remove(BLACK_CLASS);

    //Remove then add the onClick handler
    obj.removeEventListener('click', handleClick);
    obj.addEventListener('click', handleClick, {once: true});

    //Add starting positions
    if(index === 27 | index === 36) {
      obj.classList.add('placed');
      obj.classList.add('w');
      obj.removeEventListener('click', handleClick);
    }
    if(index === 35 | index === 28) {
      obj.classList.add('placed');
      obj.classList.add('b');
      obj.removeEventListener('click', handleClick);
    }

  });

//calcLegalPositions();
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
  space.classList.add(PLACED_CLASS);
  if(whiteTurn)
    space.classList.add(WHITE_CLASS);
  else
    space.classList.add(BLACK_CLASS);
  return;
}

function swapTurn() {
  whiteTurn = !whiteTurn;
  board.classList.remove(BLACK_CLASS);
  board.classList.remove(WHITE_CLASS);
  if(whiteTurn)
    board.classList.add(WHITE_CLASS);
  else
    board.classList.add(BLACK_CLASS);
  return;
}

function classExist(obj, className) {
  if (obj.classList.contains(className)) return true;
  return false;
}

function removeClassFromSpaces(class_to_remove) {
  spaces.forEach(space => {
    space.classList.remove(class_to_remove);
  });
  return;
}

function calcLegalPositions() {
  removeClassFromSpaces(ILLEGAL_CLASS);
  for(var i = 0; i < 64; i++) {
    //Doesn't need to check spots already placed.
    if(classExist(spaces[i], PLACED_CLASS))  continue;

    //illegal class added to removeEventListener later and for no hover
    if (!isSpaceLegal(i)) {spaces[i].classList.add(ILLEGAL_CLASS);}
  }
}

function isSpaceLegal(space_num) {
  //line_ids are from 0-7 (or 8 different lines to check)
  for(let i = 0; i < 8; i++) {
    if(checkLine(space_num, i)) {return true;}
  }
}

function nextSpaceExists(space_num, line_id) {
  //Next space exist as long as its not on an edge and thus checks for edges.
  switch(line_id) {
    case upLeftId:
      if (u_edge_spaces.indexOf(space_num) !== -1
        & l_edge_spaces.indexOf(space_num) !== -1)  {return false;}

    case upMidId:
      if (u_edge_spaces.indexOf(space_num !== -1))  {return false;}

    case upRightId:
      if (u_edge_spaces.indexOf(space_num) !== -1
        & r_edge_spaces.indexOf(space_num) !== -1) {return false;}

    case rightMidId:
      if (r_edge_spaces.indexOf(space_num !== -1)) {return false;}

    case lowRightId:
      if (d_edge_spaces.indexOf(space_num) !== -1
      &   r_edge_spaces.indexOf(space_num) !== -1) {return false;}

    case lowMidId:
      if (d_edge_spaces.indexOf(space_num !== -1))  {return false;}

    case lowLeftId:
      if (d_edge_spaces.indexOf(space_num) !== -1
      &   l_edge_spaces.indexOf(space_num) !== -1) {return false;}

    case leftMidId:
      if (l_edge_spaces.indexOf(space_num !== -1))  {return false;}
  }
  return true; //Assumes true unless proven otherwise.
}

function findNextSpace(space_num, line_id) {
  let nextSpace = 0;

  switch(line_id) {
    case upLeftId:
      nextSpace = space_num - 9;
    case upMidId:
      nextSpace = space_num - 8;
    case upRightId:
      nextSpace = space_num - 7;
    case rightMidId:
      nextSpace = space_num + 1;
    case lowRightId:
      nextSpace = space_num + 9;
    case lowMidId:
      nextSpace = space_num + 8;
    case lowLeftId:
      nextSpace = space_num + 7;
    case leftMidId:
      nextSpace = space_num - 1;
  }
  return nextSpace;
}

function checkLine(space_num, line_id) {

  //Prevention from walking off the array.
  if (!nextSpaceExists(space_num, line_id)) return false;

  //Use this to check the next space.
  let nextSpace = findNextSpace(space_num, line_id);

  //The end of the line should be a placed spot to be legal.
  if (classExist(spaces[nextSpace], PLACED_CLASS)) return false;

  if (whiteTurn) {
    //First space will be blank and thus the next can't be the same color.
    if (!classExist(spaces[space_num], BLANK_CLASS) &
        classExist(spaces[nextSpace], WHITE_CLASS)) return false;

    if (classExist(spaces[nextSpace], BLACK_CLASS))
      return checkLine(nextSpace, line_id);

    if (classExist(spaces[nextSpace], WHITE_CLASS))
      return true;
  }
  else {
    //First space will be blank and thus the next can't be the same color.
    if (!classExist(spaces[space_num], BLANK_CLASS) &
        classExist(spaces[nextSpace], BLACK_CLASS)) return false;
    console.log(space_num);
    if (classExist(spaces[nextSpace], WHITE_CLASS))
      return checkLine(nextSpace, line_id);

    if (classExist(spaces[nextSpace], BLACK_CLASS))
      return true;
  }
}
