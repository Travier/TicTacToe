//AI Stuff coming soon
function computerTurn() {

  if(gameState.concluded) {
    return;
  }

  var spaces = grid.findFreeSpaces();
  var selection = getRandomInt(0, spaces.length - 1);
  var coords = spaces[selection];

  if(spaces.lenth <= 0) {
    return;
  }

  console.log("Computer takes " + coords[0] + ":" + coords[1]);
  grid.set(coords[0], coords[1], "O");
}
