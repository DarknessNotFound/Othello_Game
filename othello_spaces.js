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

  this.make_spaces = function() {
    this.spaces = [];
    for(let i = 0; i < this.board_size; i++) {
      this.spaces.push(new Space(i));
    }
    return true;
  }

  this.place_disk = function (id) {
    if(this.legalSpace(id)) {
      this.spaces[id].placed = true;
      this.spaces[id].b_space = this.b_turn;
      this.flipDisksInLine(id);
    }
  }

}
Board.prototype.constructor = Board;

var main_board = new Board(8);

console.log(main_board.spaces);
console.log(main_board.board_size);
console.log(main_board.placed);
console.log(main_board.b_space);
