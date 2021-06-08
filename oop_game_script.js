const board_wrapper = document.getElementById('board');
var main_board = new Board(8);
main_board.initialBoardToHTML(board_wrapper);
console.log(main_board);
