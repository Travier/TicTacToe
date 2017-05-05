//UTILITY FUNCTIONS

//SYNC
function _foreach(arr, call) {
  if(arr.length <= 0) {
    return false;
  }

  for(var i = 0; i < arr.length; i++) {
    var row = arr[i];

    call(row);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
