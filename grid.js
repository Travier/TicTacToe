//A State Machine that has no control over inputs only the state of the grid
//Only handles 3x3 grid
function Grid() {
  this.state = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
}

Grid.prototype.set = function (row, column, value) {
  this.state[row][column] = value;
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
