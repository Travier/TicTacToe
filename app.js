var grid = new Grid();

var inputs = [
  [$('#00'), $('#01'), $('#02')],
  [$('#10'), $('#11'), $('#12')],
  [$('#20'), $('#21'), $('#22')]
]

function clickedGridItem(row, col) {
  grid.set(row, col, 'X');

  computerTurn();
}

function checkForWinner(letter) {
  var checks = [];

  //Diag
  checks.push(grid.hasTakenSpaces(letter, [
    [0,0],
    [1,1],
    [2,2]
  ]));

  checks.push(grid.hasTakenSpaces(letter, [
    [0,2],
    [1,1],
    [2,0]
  ]));

  //Horizontal
  checks.push(grid.hasTakenSpaces(letter, [
    [0,0],
    [0,1],
    [0,2]
  ]));

  checks.push(grid.hasTakenSpaces(letter, [
    [1,0],
    [1,1],
    [1,2]
  ]));

  checks.push(grid.hasTakenSpaces(letter, [
    [2,0],
    [2,1],
    [2,2]
  ]));

  //Veritcal
  checks.push(grid.hasTakenSpaces(letter, [
    [0,0],
    [1,0],
    [2,0]
  ]));

  checks.push(grid.hasTakenSpaces(letter, [
    [0,1],
    [1,1],
    [2,1]
  ]));

  checks.push(grid.hasTakenSpaces(letter, [
    [0,2],
    [1,2],
    [2,2]
  ]));

  for(var i = 0; i <= checks.length; i++) {
    if(checks[i]) {
      return true;
    }
  }

  return false;
}

function clearGrid() {
  grid.clear();

  console.clear();
  render();
}

function renderRow(row) {
  var index = 0;
  _foreach(inputs[row], function(ele) {
    var displayData = grid.get(row, index, " ");
    ele.html(displayData);

    index++;
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render() {
  for(var i = 0; i <= 2; i++) {
    renderRow(i);
  }

  if(checkForWinner("X")) {
    console.log("X has won the grid!");
  }

  if(checkForWinner("O")) {
    console.log("O has won the grid!");
  }
}

//intial render
render();
//render again after state change
grid.onStateChange(function() {
  render();
});

//AI Stuff coming soon
function computerTurn() {
  var spaces = grid.findFreeSpaces();
  var selection = getRandomInt(0, spaces.length - 1);
  var coords = spaces[selection];

  if(spaces.lenth <= 0) {
    return;
  }

  console.log("Computer takes " + coords[0] + ":" + coords[1]);
  grid.set(coords[0], coords[1], "O");
}
