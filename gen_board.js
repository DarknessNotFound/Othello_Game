board = document.getElementById('board');
for(var i = 0; i < 64; i++) {
  const space = document.createElement('div');
  space.id = 'space';
  space.classList.add('space');
  space.innerHTML = i;

  board.appendChild(space);
}
