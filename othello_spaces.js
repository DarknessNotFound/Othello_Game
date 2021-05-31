function Space(placed, b_space) {
  this.placed = placed || false;
  this.b_space = b_space || true;
}
Space.prototype.constructor = Space;

function Board(side_len) {
  Space.call(this);
  this.side_len = side_len || 8;
  this.board_size = side_len * side_len;
  this.spaces = [];

  this.func_temp = function () {
    console.log("HI");
  }
}
Board.prototype.constructor = Board;

Board.prototype.make_spaces = function() {
  this.spaces = [];
  for(let i = 0; i < this.board_size; i++) {
    this.spaces.push(new Space());
  }
  return true;
}


var main_board = new Board(8);

console.log(main_board.spaces);
console.log(main_board.board_size);
console.log(main_board.placed);
console.log(main_board.b_space);
