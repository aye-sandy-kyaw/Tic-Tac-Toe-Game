var r1 = [0, 0, 0, 0];
var r2 = [0, 0, 0, 0];
var r3 = [0, 0, 0, 0];
var r4 = [0, 0, 0, 0];

var first = 1;
var second = 2;
var current = first;
var finished = false;
var showResult = document.getElementById("winner");

/**
 *This method is used for flip the circle
 * @param {*} obj is user clicked circle
 */

function flip(obj) {
  if (finished == false) {
    var valid = true;
    var tmp = obj.id.split(",");
    var clickRow = Number(tmp[0]);
    var clickColumn = Number(tmp[1] - 1);

    // check which row user win
    switch (clickRow) {
      case 1:
        if (r1[clickColumn] != 0) {
          valid = false;
          break;
        }
        r1[clickColumn] = current;
        break;
      case 2:
        if (r2[clickColumn] != 0) {
          valid = false;
          break;
        }
        r2[clickColumn] = current;
        break;
      case 3:
        if (r3[clickColumn] != 0) {
          valid = false;
          break;
        }
        r3[clickColumn] = current;
        break;
      case 4:
        if (r4[clickColumn] != 0) {
          valid = false;
          break;
        }
        r4[clickColumn] = current;
        break;
    }

    // change player
    if (valid == true) {
      //switch player
      obj.style.transform = "scaleY(-1)";
      if (current == first) {
        playSound();
        obj.style.background = "tomato";
        current = second;
        document.getElementById("turn").innerText = "Player 2 Turn!";
        document.getElementById("turn").style.color = "teal;";
        ai();
      } else {
        playSound();
        obj.style.background = "teal";
        current = first;
        document.getElementById("turn").innerText = "Player 1 Turn!";
        document.getElementById("turn").style.color = "tomato;";
      }
    }
    checkWhowin();
  }
}

/**
 * this method is used to check winner
 */
function checkWhowin() {
  //horizontal check
  if (horizontal(first)) {
    finished = true;
    finishGameSound();
    showResult.innerText = "Player 1 Win!";
  } else if (horizontal(second)) {
    finished = true;
    finishGameSound();
    showResult.innerText = "Player 2 Win!";
  }

  //vertical check
  if (vertical(first)) {
    finished = true;
    finishGameSound();
    showResult.innerText = "Player 1 Win!";
  } else if (vertical(second)) {
    finished = true;
    finishGameSound();
    showResult.innerText = "Player 2 Win!";
  }

  //diagonal check
  if (diagonal(first)) {
    finished = true;
    finishGameSound();
    showResult.innerText = "Player 1 Win!";
  } else if (diagonal(second)) {
    finished = true;
    finishGameSound();
    showResult.innerText = "Player 2 Win!";
  }

  //draw check
  draw();
}

//For horizontal check
function horizontal(player) {
  var num0, num1, num2, num3;
  num0 = 0;
  num1 = 1;
  num2 = 2;
  num3 = 3;

  if (
    (r1[num0] == player &&
      r1[num1] == player &&
      r1[num2] == player &&
      r1[num3] == player) ||
    (r2[num0] == player &&
      r2[num1] == player &&
      r2[num2] == player &&
      r2[num3] == player) ||
    (r3[num0] == player &&
      r3[num1] == player &&
      r3[num2] == player &&
      r3[num3] == player) ||
    (r4[num0] == player &&
      r4[num1] == player &&
      r4[num2] == player &&
      r4[num3] == player)
  )
    return true;

  return false;
}

// For vertical check
function vertical(player) {
  for (let index = 0; index < 4; index++)
    if (
      r1[index] == player &&
      r2[index] == player &&
      r3[index] == player &&
      r4[index] == player
    )
      return true;

  return false;
}

//For diagonal check
function diagonal(player) {
  if (
    (r1[0] == player &&
      r2[1] == player &&
      r3[2] == player &&
      r4[3] == player) ||
    (r1[3] == player && r2[2] == player && r3[1] == player && r4[0] == player)
  )
    return true;

  return false;
}

//For draw check
function draw() {
  if (!r1.concat(r2, r3, r4).includes(0)) {
    finished = true;
    finishGameSound();
    showResult.innerText = "Draw!";
  }
}

//play with Ai
function ai() {
  var found = false;
  var a1, a2, a3, a4;

  a1 = [1, 1, 1, 0];
  a2 = [1, 1, 0, 1];
  a3 = [1, 0, 1, 1];
  a4 = [0, 1, 1, 1];

  if (
    r1.toString() == a1.toString() ||
    r1.toString() == a2.toString() ||
    r1.toString() == a3.toString() ||
    r1.toString() == a4.toString()
  ) {
    found = probability(r1);
    found = true;
  } else if (
    r2.toString() == a1.toString() ||
    r2.toString() == a2.toString() ||
    r2.toString() == a3.toString() ||
    r2.toString() == a4.toString()
  ) {
    found = probability(r2);
    found = true;
  } else if (
    r3.toString() == a1.toString() ||
    r3.toString() == a2.toString() ||
    r3.toString() == a3.toString() ||
    r3.toString() == a4.toString()
  ) {
    found = probability(r3);
    found = true;
  } else if (
    r4.toString() == a1.toString() ||
    r4.toString() == a2.toString() ||
    r4.toString() == a3.toString() ||
    r4.toString() == a4.toString()
  ) {
    found = probability(r4);
    found = true;
  } else {
    computer();
  }
  return found;
}

/**
 * this method is used to check rows (when play with Ai)
 */
function probability(array) {
  var count = 0;
  var blankIndex = 0;
  for (let index = 0; index < array.length; index++) {
    if (array[index] == first) {
      count++;
    } else {
      blankIndex = index;
    }
  }

  if (count == 3) {
    blankIndex += 1;
    var forceClick;

    switch (array) {
      case r1:
        forceClick = 1 + "," + blankIndex; //For r1
        break;
      case r2:
        forceClick = 2 + "," + blankIndex; //For r2
        break;
      case r3:
        forceClick = 3 + "," + blankIndex; //For r3
        break;
      case r4:
        forceClick = 4 + "," + blankIndex; //For r4
        break;
    }

    setTimeout(() => {
      document.getElementById(forceClick).click();
    }, 200);
    return true;
  }
  return false;
}

// random show
function computer() {
  var r = Math.floor(Math.random() * 4 + 1);
  var c = Math.floor(Math.random() * 4 + 1);
  var randomclick = r + "," + c;

  setTimeout(() => {
    document.getElementById(randomclick).click();
    if (current == second) {
      computer();
    }
  }, 200);
}

/**
 * this method is used to play click sound
 */
function playSound() {
  var audio = document.getElementById("flip");
  audio.play();
}

/**
 * this method is used to finish game sound
 */
function finishGameSound() {
  var audio = document.getElementById("finishGame");
  audio.play();
}
