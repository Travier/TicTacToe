//UTILITY FUNCTIONS

function _foreach(arr, call) {
  if(arr.length <= 0) {
    return false;
  }

  for(var i = 0; i < arr.length; i++) {
    var row = arr[i];

    call(row);
  }
}

//END UTILITY FUNCTIONS


var users = {
  1:"X",
  2:"O"
};

var grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

var inputs = [
  [$('#00'), $('#01'), $('#02')],
  [$('#10'), $('#11'), $('#12')],
  [$('#20'), $('#21'), $('#22')]
]

function clickedGridItem(row, col) {
  set(row, col, 'X');

  computerTurn();
}

function get(row, col) {
  var value = grid[row][col];

  if(!value) {
    return "";
  }

  return value;
}

function set(row, col, value) {
  grid[row][col] = value;

  //Render after state change
  render();
}

function checkForWinner(letter) {
  var checks = [];

  //Diag
  checks.push(isGridState(letter, [
    [0,0],
    [1,1],
    [2,2]
  ]));

  checks.push(isGridState(letter, [
    [0,2],
    [1,1],
    [2,0]
  ]));

  //Horizontal
  checks.push(isGridState(letter, [
    [0,0],
    [0,1],
    [0,2]
  ]));

  checks.push(isGridState(letter, [
    [1,0],
    [1,1],
    [1,2]
  ]));

  checks.push(isGridState(letter, [
    [2,0],
    [2,1],
    [2,2]
  ]));

  //Veritcal
  checks.push(isGridState(letter, [
    [0,0],
    [1,0],
    [2,0]
  ]));

  checks.push(isGridState(letter, [
    [0,1],
    [1,1],
    [2,1]
  ]));

  checks.push(isGridState(letter, [
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

function findFreeSpaces() {
  var freeSpaces = [];
  for(var r = 0; r <= 2; r++) {
    for(var c = 0; c <= 2; c++) {
      if(spaceIsFree(r, c)) {
        freeSpaces.push([r, c]);
      }
    }
  }

  return freeSpaces;
}

function spaceIsFree(row, col) {
  var value = grid[row][col];

  return (value ? false : true);
}

function isGridState(letter, coords) {
  var isState = true;
  _foreach(coords, function(coord) {
    var row = coord[0];
    var col = coord[1];

    if(get(row, col) !== letter) {
      isState = false;
    }
  })

  return isState;
}

function clearGrid() {
  grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  console.clear();
  render();
}

function renderRow(row) {
  var index = 0;
  _foreach(inputs[row], function(ele) {
    var displayData = get(row, index);
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

//AI Stuff coming soon

function computerTurn() {
  var spaces = findFreeSpaces();
  var selection = getRandomInt(0, spaces.length - 1);
  var coords = spaces[selection];

  if(spaces.lenth <= 0) {
    return;
  }

  console.log("Computer takes " + coords[0] + ":" + coords[1]);
  set(coords[0], coords[1], "O");
}
