board = document.getElementById('board');
for(var i = 0; i < 64; i++) {
  const space = document.createElement('div');
  space.id = 'space';
  space.classList.add('space');
  if(i === 27 | i === 36) {
    space.classList.add('placed');
    space.classList.add('w');
  }
  if(i === 35 | i === 28) {
    space.classList.add('placed');
    space.classList.add('b');
  }

  space.innerHTML = i;

  board.appendChild(space);
}
