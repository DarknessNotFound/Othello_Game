board = document.getElementById('board');
for(var i = 0; i < 64; i++) {
  const space = document.createElement('div');
  space.classList.add('space');
  if(i < 32)
  {
    space.classList.add('placed');
    if((i % 2) === 0)
      space.classList.add('w');
    else
      space.classList.add('b');
  }
  board.appendChild(space);
}
