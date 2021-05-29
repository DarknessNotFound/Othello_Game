board = document.getElementById('board');
w_counter_grid = document.getElementById('w-counter-grid');
b_counter_grid = document.getElementById('b-counter-grid');

for(var i = 0; i < 64; i++) {
  add_space(board, is_board=true);
  add_space(w_counter_grid, is_board=false);
  add_space(b_counter_grid, is_board=false);
}

function add_space(grid, is_board=false) {
  const space = document.createElement('div');
  space.id = 'space';
  space.classList.add('space');

  if(!is_board) {
    space.id = 'counter-disk';
    space.classList.add('placed');
    space.classList.add('blank');
    space.classList.add('counter-disk');
  }

  grid.appendChild(space);
  return;
}
