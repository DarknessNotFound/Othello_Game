//This file will solely generate the three boards nessessary for the game to run

board = document.getElementById('board');
w_counter_grid = document.getElementById('w-counter-grid');
b_counter_grid = document.getElementById('b-counter-grid');

//Make three seperate boards: one for playing and two for the disk counter.
for(var i = 0; i < 64; i++) {
  add_space(board, is_board=true, i+1);
  add_space(w_counter_grid, is_board=false);
  add_space(b_counter_grid, is_board=false);
}

//add_space() will add a space to the inputed grid.
//Pre: grid is a <div>, is_board determines if it already has disks or not. num
//     is the number to id the grid.
//Post: the grid has a new 'div' element with the space class and others.
function add_space(grid, is_board=false, num=0) {
  const space = document.createElement('div');
  space.id = 'space';
  space.classList.add('space');

  //Adding blank disk to the non-board visualizations.
  if(!is_board) {
    space.id = 'counter-disk';
    space.classList.add('placed');
    space.classList.add('blank');
    space.classList.add('counter-disk');
  }
  else {
    space.innerHTML = num; //Comment out this line to take out numbers on tiles.
  }
  grid.appendChild(space);
  return;
}
