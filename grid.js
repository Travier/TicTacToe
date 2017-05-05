//A State Machine that has no control over inputs only the state of the grid
//Only handles 3x3 grid
function Grid() {
  this.state = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  this.onStateChangeCallbacks = [];
}

Grid.prototype.eventStateChanged = function () {
  _foreach(this.onStateChangeCallbacks, function(callback) {
    callback();
  });
};

Grid.prototype.onStateChange = function (cb) {
  this.onStateChangeCallbacks.push(cb);
};

Grid.prototype.clear = function () {
  this.state = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  this.eventStateChanged();
};

Grid.prototype.set = function (row, column, value) {
  this.state[row][column] = value;

  this.eventStateChanged();
};

Grid.prototype.get = function (row, column, defaultValue) {
  var value = this.state[row][column];

  if(defaultValue && value == 0) {
    return defaultValue;
  }

  return value;
};

/*
 Give a letter and array of coords. This will determine if that letter has taken each space
 returns boolean
*/
Grid.prototype.hasTakenSpaces = function (letter, coords) {
  var self = this;
  //true until failed
  var takenSpaces = true;
  _foreach(coords, function(coord) {
    var row = coord[0];
    var col = coord[1];

    //if one coord does not match then fail
    if(self.get(row, col) !== letter) {
      takenSpaces = false;
    }
  });

  return takenSpaces;
};

Grid.prototype.findFreeSpaces = function () {
  var spaces = [];
  for(var r = 0; r <= 2; r++) {
    for(var c = 0; c <= 2; c++) {
      if(this.spaceIsFree(r, c)) {
        spaces.push([r, c]);
      }
    }
  }

  return spaces;
};

Grid.prototype.spaceIsFree = function (row, col) {
  var value = grid.get(row, col);

  return (value ? false : true);
};

Grid.prototype.console = function () {
  console.log("Grid State:");
  console.log(this.state[0]);
  console.log(this.state[1]);
  console.log(this.state[2]);
};
