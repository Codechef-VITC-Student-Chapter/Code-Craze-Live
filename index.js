const board = document.getElementById('board');
let pieces = [];
let player = 'red';

for (let i = 0; i < 7; i++) {
  let row = [];
  for (let j = 0; j < 7; j++) {
    const box = document.createElement('div');
    box.className = 'box';
    box.dataset.row = i;
    box.dataset.col = j;
    box.onclick = clicked;
    board.appendChild(box);
    row.push(box);
  }
  pieces.push(row);
}

function clicked(event) {
  const coin = document.createElement('div');
  coin.className = 'coin ' + player;
  coin.dataset.col = event.target.dataset.col;

  const col = event.target.dataset.col;
  var isCoinPlaced = false;

  for (let i = 6; i >= 0; i--) {
    if (pieces[i][col].querySelector('.coin') == null) {
      pieces[i][col].appendChild(coin);
      isCoinPlaced = true;
      break;
    }
  }

  if (isCoinPlaced) {
    if (checkWin()) {
      alert(player + ' wins!');
    }
    swapPlayer();
  }
}

function swapPlayer() {
  if (player == 'red') {
    player = 'yellow';
  } else {
    player = 'red';
  }
}

moves = [
  [-1, 0],
  [0, 1],
  [-1, 1],
  [-1, -1],
]; // up, right, diag ur, diag ul

function checkWin() {
  for (let k = 0; k < 4; k++) {
    // Iterating throguh all moves
    for (let i = 0; i < 7; i++) {
      // Iterate through all rows
      for (let j = 0; j < 7; j++) {
        // Iterate throguh all columns
        if (checkPiece(i, j, moves[k][0], moves[k][1])) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkPiece(row, col, change_row, change_col) {
  var steps = 0;
  const to_check = pieces[row][col].querySelector('.' + player);
  while (row >= 0 && col >= 0 && row <= 6 && col <= 6 && to_check != null) {
    if (pieces[row][col].querySelector('.' + player) != null) {
      steps++;
    } else {
      break;
    }
    row += change_row;
    col += change_col;
  }
  if (steps >= 4) {
    return true;
  }

  return false;
}
