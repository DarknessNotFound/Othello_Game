//This controls the state of the board and game as its play. The bulk of the
//code is in this file.
//NOTE: 'b' and 'w' represent black and white respectivaly.
const BLACK_CLASS = 'b';
const WHITE_CLASS = 'w';
const PLACED_CLASS = 'placed';
const ILLEGAL_CLASS = 'illegal';
let TARGETCLASS = 'target';

const board = document.getElementById('board');
const turn_tracker = document.getElementById('turn-tracker');
const reset_btn = document.getElementById('restart-btn');

//Code can break if in a nodeList vs an Array.
const spaces_nodeList = board.querySelectorAll('div.space');
const spaces = Array.from(spaces_nodeList);

const w_counter_grid_nodeList =
       document.getElementById('w-counter-grid').querySelectorAll('div.space');
const w_counter_grid_spaces = Array.from(w_counter_grid_nodeList);

const b_counter_grid_nodeList =
       document.getElementById('b-counter-grid').querySelectorAll('div.space');
const b_counter_grid_spaces = Array.from(b_counter_grid_nodeList);

//Only the spaces on the edges won't exist if you go in the wrong direction.
//These are used to prevent that.
const l_edge_spaces = [0, 8, 16, 24, 32, 40, 48, 56];
const r_edge_spaces = [7, 15, 23, 31, 39, 47, 55, 63];
const u_edge_spaces = [0, 1, 2, 3, 4, 5, 6, 7];
const d_edge_spaces = [56, 57, 58, 59, 60, 61, 62, 63];

//Set-up id's to make looping through the directions easy w/ a switch-case.
const upLeftId = 0;
const upMidId = 1;
const upRightId = 2;
const rightMidId = 3;
const lowRightId = 4;
const lowMidId = 5;
const lowLeftId = 6;
const leftMidId = 7;

//Controls whose turn it is. Black always goes first.
let whiteTurn = false;

//Code to start the program.
reset_btn.addEventListener('click', startGame);
startGame();

//startGame() resets the beginning board state.
//Pre: None.
//Post: All pieces removed, add beginning positions, set whiteTurn to be false.
function startGame() {
  if(whiteTurn) swapTurn();
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
  updateDiskCounter();
  calcLegalPositions();
  return;
}

//containsTarget() checks if the obj has the TARGETCLASS.
//Pre: Obj is an object with a classList.
//Post: Returns if the object has the TARGETCLASS.
function containsTarget(obj) {
  return classExist(obj, TARGETCLASS);
}

//handleClick(e) is the function applied to all the empty, legal board positions
//Pre: the space shouldn't have a piece and should be a legal spot to place.
//Post: Adds the pieces, flips all the nessessary disks, the turn is swapped,
//      legalPositions are recalulated, and checks if the game has ended.
function handleClick(e) {
  const space = e.target;
  const space_index =  spaces.indexOf(space);//spaceIndex(space);
  addDisk(space);
  flipDisksAfterPlacement(space_index);
  swapTurn();
  calcLegalPositions();

  if(!canPlace()) {  //If a player can't place a piece then their turn is passed
    cantPlaceMsg();
    swapTurn();
    calcLegalPositions();
    if(checkGameOver())
      gameOver();
  }
  return;
}

function gameOver() {
  let alertMsg = "";
  alertMsg += "Game over!  ----  ";
  alertMsg = (countDisk(count_White=true) > countDisk(count_White=false) ?
              "White" : "Black");
  alertMsg += " won!";
  alert(alertMsg);

}

function checkGameOver() {
  if(!canPlace()) {
    swapTurn();
    calcLegalPositions();
    if(!canPlace())
      return true;
  }
  return false;
}

function canPlace() {
  let legal_move_counter = 0;
  for(let i = 0; i < 64; i++) {
    if (!classExist(spaces[i], PLACED_CLASS)
    & !classExist(spaces[i], ILLEGAL_CLASS))
    legal_move_counter++;
  }
  console.log(legal_move_counter);
  if(legal_move_counter === 0)
    return false;
  return true;
}

function cantPlaceMsg() {
  let msg = "";
  if(whiteTurn)
    msg += "White ";
  else
    msg += "Black ";
  msg += "can\'t move, not swapping sides...";
  alert(msg);
  return;
}

function countDisk(count_White = true) {
  let count = 0;
  let class_using = (count_White ? WHITE_CLASS : BLACK_CLASS);

  spaces.forEach(i => {
    if(classExist(i, class_using))
      count++;
  });
  return count;
}

function updateDiskCounter() {
  let b_count = countDisk(count_White = false);
  let w_count = countDisk(count_Black = true);

  document.getElementById('b-counter-text').innerHTML = b_count;
  document.getElementById('w-counter-text').innerHTML = w_count;

  updateDiskCounterDisplay(w_counter_grid_spaces, w_count, is_black=false);
  updateDiskCounterDisplay(b_counter_grid_spaces, b_count, is_black=true);
  return;
}

function updateDiskCounterDisplay(diskArr, num_disks, is_black) {
  for(let i = 0; i < 64; i++) {
    diskArr[i].classList.remove('blank');
    diskArr[i].classList.remove('w');
    diskArr[i].classList.remove('b');

    if(i < num_disks) {
      if(is_black)
        diskArr[i].classList.add('b');
      else
        diskArr[i].classList.add('w');
    } else {
      diskArr[i].classList.add('blank');
    }
  }

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

function flipIndividualDisk(space) {
  if(!classExist(space, PLACED_CLASS)) {
    console.log('ERROR: flipped empty space');
    return false;
  }

  if(classExist(space, BLACK_CLASS)) {
    space.classList.remove(BLACK_CLASS);
    space.classList.add(WHITE_CLASS);
  }
  else {
    space.classList.remove(WHITE_CLASS);
    space.classList.add(BLACK_CLASS);
  }
  return true;
}

function flipDisksAfterPlacement(space_num) {
  for(var lineDir = 0; lineDir < 8; lineDir++) {
    if (checkLine(space_num, lineDir)) {
      flipDisksInLine(space_num, lineDir);
    }
  }
  updateDiskCounter();
  return;
}

function flipDisksInLine(space_num, lineDir) {

  let nextTile = findNextSpace(space_num, lineDir);

  if( !(classExist(spaces[space_num], WHITE_CLASS) & whiteTurn)
    & !(classExist(spaces[space_num], BLACK_CLASS) & !whiteTurn) ) {
      flipIndividualDisk(spaces[space_num]);
    }

  if( !(classExist(spaces[nextTile], WHITE_CLASS) & whiteTurn)
    & !(classExist(spaces[nextTile], BLACK_CLASS) & !whiteTurn) ) {
      flipDisksInLine(nextTile, lineDir);
    }
  return;
}

function swapTurn() {
  whiteTurn = !whiteTurn;
  board.classList.remove(BLACK_CLASS);
  board.classList.remove(WHITE_CLASS);
  if(whiteTurn) {
    board.classList.add(WHITE_CLASS);
    turn_tracker.innerHTML = "White Turn";
  }
  else {
    turn_tracker.innerHTML = "Black Turn";
    board.classList.add(BLACK_CLASS);
  }
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

function readdBtnFuncToLegal() {
  for(var i = 0; i < 64; i++) {
    if(classExist(spaces[i], ILLEGAL_CLASS)
       | classExist(spaces[i], PLACED_CLASS)) {
      spaces[i].removeEventListener('click', handleClick);
    } else {
      spaces[i].addEventListener('click', handleClick);
    }
  }
}

function calcLegalPositions() {
  removeClassFromSpaces(ILLEGAL_CLASS);
  for(var i = 0; i < 64; i++) {
    //Doesn't need to check spots already placed.
    if(classExist(spaces[i], PLACED_CLASS))  continue;

    //illegal class added to removeEventListener later and for no hover
    if (!isSpaceLegal(i)) {spaces[i].classList.add(ILLEGAL_CLASS);}
  }
  readdBtnFuncToLegal();
}

function isSpaceLegal(space_num) {
  //line_ids are from 0-7 (or 8 different lines to check)
  for(let i = 0; i < 8; i++) {
    if(checkLine(space_num, i)) return true;
  }
  return false;
}

function nextSpaceExists(space_num, line_id) {
  //Next space exist as long as its not on an edge and thus checks for edges.
  let spaceDoesExist = false;

  switch(line_id) {
    case upLeftId:
      if ((u_edge_spaces.indexOf(space_num) === -1)
        & (l_edge_spaces.indexOf(space_num) === -1))
          spaceDoesExist = true;
      break;

    case upMidId:
      if (u_edge_spaces.indexOf(space_num) === -1)
        spaceDoesExist = true;
      break;

    case upRightId:
      if (u_edge_spaces.indexOf(space_num) === -1
        & r_edge_spaces.indexOf(space_num) === -1)
          spaceDoesExist = true;
      break;

    case rightMidId:
      if (r_edge_spaces.indexOf(space_num) === -1)
        spaceDoesExist = true;
      break;

    case lowRightId:
      if (d_edge_spaces.indexOf(space_num) === -1
      &   r_edge_spaces.indexOf(space_num) === -1)
        spaceDoesExist = true;
      break;

    case lowMidId:
      if (d_edge_spaces.indexOf(space_num) === -1)
        spaceDoesExist = true;
      break;

    case lowLeftId:
      if (d_edge_spaces.indexOf(space_num) === -1
      &   l_edge_spaces.indexOf(space_num) === -1)
        spaceDoesExist = true;
      break;

    case leftMidId:
      if (l_edge_spaces.indexOf(space_num) === -1)
        spaceDoesExist = true;
      break;
  }
  return spaceDoesExist; //Assumes true unless proven otherwise.
}

function findNextSpace(space_num, line_id) {
  let nextSpace = -1;

  switch(line_id) {
    case upLeftId:
      nextSpace = space_num - 9;
      break;
    case upMidId:
      nextSpace = space_num - 8;
      break;
    case upRightId:
      nextSpace = space_num - 7;
      break;
    case rightMidId:
      nextSpace = space_num + 1;
      break;
    case lowRightId:
      nextSpace = space_num + 9;
      break;
    case lowMidId:
      nextSpace = space_num + 8;
      break;
    case lowLeftId:
      nextSpace = space_num + 7;
      break;
    case leftMidId:
      nextSpace = space_num - 1;
      break;
  }
  return nextSpace;
}

function checkLine(space_num, line_id) {
  //Prevention from walking off the array.
  if (!nextSpaceExists(space_num, line_id)) return false;

  //Use this to check the next space.
  let nextSpace = findNextSpace(space_num, line_id);

  //The end of the line should be a placed spot to be legal.
  if (!classExist(spaces[nextSpace], PLACED_CLASS)) return false;

  if (whiteTurn) {
    //First space will be blank and thus the next can't be the same color.
    if (!classExist(spaces[space_num], PLACED_CLASS) &
        classExist(spaces[nextSpace], WHITE_CLASS)) return false;

    if (classExist(spaces[nextSpace], BLACK_CLASS))
      return checkLine(nextSpace, line_id);

    if (classExist(spaces[nextSpace], WHITE_CLASS))
      return true;
  }
  else {
    //First space will be blank and thus the next can't be the same color.
    if (!classExist(spaces[space_num], PLACED_CLASS) &
        classExist(spaces[nextSpace], BLACK_CLASS)) return false;
    if (classExist(spaces[nextSpace], WHITE_CLASS))
      return checkLine(nextSpace, line_id);

    if (classExist(spaces[nextSpace], BLACK_CLASS))
      return true;
  }
}
