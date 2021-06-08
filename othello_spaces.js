PLACED_CLASS = 'placed';
BLACK_CLASS = 'b';
WHITE_CLASS = 'w';
BLANK_CLASS = 'blank';

function Space(id = 0, placed, b_space) {
  this.id = id;
  this.placed = placed || false;
  this.b_space = b_space || true;
}
Space.prototype.constructor = Space;

function Board(side_len, b_turn) {
  Space.call(this);
  this.side_len = side_len || 8;
  this.board_size = side_len * side_len;
  this.spaces = [];
  this.b_turn = b_turn || true;

  //Alternating between black and white spaces (starting with black).
  this.initialSpaces = [28, 27, 35, 36];

  this.set_initial_board_state();
  var edge_spaces = getEdgeSpaces(this.side_len, this.side_len);

}
Board.prototype.constructor = Board;

function getEdgeSpaces(height, width) {
  let edgeSpaces = {
    up_edge: [],
    low_edge: [],
    left_edge: [],
    right_edge: []
  };
  let total_spaces = height * width;

  //Up_edge spaces and lower edge spaces
  for(let i = 0; i < width; i++) {
    edgeSpaces.up_edge.push(i);
    edgeSpaces.low_edge.push(i + (total_spaces - width));
  }

  for(let i = 0; i < height; i++) {
    edgeSpaces.left_edge.push(i*width);
    edgeSpaces.right_edge.push(i*width + width - 1);
  }

  return edgeSpaces;
}

var dir_ids = { //directional ids
  up_left: 0,
  up_mid: 1,
  up_right: 2,
  right_mid: 3,
  low_right: 4,
  low_mid: 5,
  low_left: 6,
  left_mid: 7
};

Board.prototype.legalSpace = function(id, direction) {
  return true;
  let legalSpace = true;
  switch (direction) {
    case dir_ids.up_left:
      if (this.edgeSpaces.up_edge.includes(id) ||
          this.edgeSpaces.left_edge.includes(id))
        legalSpace = false;
      break;

    case dir_ids.up_mid:
      if (this.edgeSpaces.up_edge.includes(id))
        legalSpace = false;
      break;

    case dir_ids.up_right:
      if (this.edgeSpaces.up_edge.includes(id) ||
          this.edgeSpaces.right_edge.includes(id))
        legalSpace = false;
      break;

    case dir_ids.right_mid:
      if (this.edgeSpaces.right_edge.includes(id))
        legalSpace = false;
      break;

    case dir_ids.low_right:
      if (this.edgeSpaces.low_edge.includes(id) ||
          this.edgeSpaces.right_edge.includes(id))
        legalSpace = false;
      break;

    case dir_ids.low_mid:
      if (this.edgeSpaces.low_edge.includes(id))
        legalSpace = false;
      break;

    case dir_ids.low_left:
      if (this.edgeSpaces.up_edge.includes(id) ||
          this.edgeSpaces.left_edge.includes(id))
        legalSpace = false;
      break;

    case dir_ids.left_mid:
      if (this.edgeSpaces.left_edge.includes(id))
        legalSpace = false;
      break;
  }
  return legalSpace;
}

Board.prototype.set_initial_board_state = function() {
  this.spaces = [];
  for(let i = 0; i < this.board_size; i++) {
    this.spaces.push(new Space(i));
  }

  this.initialSpaces.forEach((space, index) => {
    this.spaces[space].placed = true;
    this.spaces[space].b_space = ( (index % 2) === 0);
  });

  return true;
}

Board.prototype.place_disk = function (id) {
  if(this.legalSpace(id)) {
    this.spaces[id].placed = true;
    this.spaces[id].b_space = this.b_turn;
    this.flipDisksInLine(id);
    this.updateBoard();
  }
}

Board.prototype.flipDisksInLine = function (id) {
  return true;
}

Board.prototype.initialBoardToHTML = function(src) {
  this.spaces.forEach((space) => {
    const new_space = document.createElement('li');
    new_space.id = space.id;
    new_space.classList.add('space');
    if(space.placed) {
      new_space.classList.add(PLACED_CLASS);
      if(space.b_space)
        new_space.classList.add(BLACK_CLASS);
      else
        new_space.classList.add(WHITE_CLASS);
    } else {
      new_space.classList.add(BLANK_CLASS);
    }

    src.appendChild(new_space);
  });

}

Board.prototype.updateBoard = function() {
  board_ele = document.getElementById('board');
  console.log(board_ele);

  this.spaces.forEach((item, index) => {
    /*space_ele = board_ele.getChildById(index);
    if(item.placed)
      space_ele.classList.add(PLACED_CLASS);
    else
      space_ele.classList.remove(PLACED_CLASS);*/
  });

}
