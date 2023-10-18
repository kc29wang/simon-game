var randomColor = "";
var sequenceColor = [];
var clickedAnswer = [];
var i = 1;
$(document).on("keypress", function (e) {
  if (e.key === "a" && $("h1").text() === "Press A Key to Start") {
    $("h1").text("Level - " + i);
    randomColor = generateColor();
    playSound(randomColor);
    flashButton(randomColor);
    sequenceColor.push(randomColor);
  } else if ($("h1").text() === "Game Over, Press Any Key to Restart") {
    $("h1").text("Press A Key to Start");
  }
});

$(".btn").on("click", function () {
  clickedAnswer.push(this.id);
  if (checkAnswer(clickedAnswer) === "fail") {
    displayGameover();
    playGameoverSound();
    randomColor = "";
    clickedAnswer = [];
    sequenceColor = [];
    i = 1;
  } else if (checkAnswer(clickedAnswer) === "pass") {
    setTimeout(() => {
      i++;
      $("h1").text("Level - " + i);
      randomColor = generateColor();
      sequenceColor.push(randomColor);
      playSound(randomColor);
      flashButton(randomColor);
      clickedAnswer = [];
    }, 1000);
  }
});

$("#blue").on("click", function () {
  pressButton("blue");
  playSound("blue");
});

$("#green").on("click", function () {
  pressButton("green");
  playSound("green");
});

$("#red").on("click", function () {
  pressButton("red");
  playSound("red");
});

$("#yellow").on("click", function () {
  pressButton("yellow");
  playSound("yellow");
});

function playSound(colorPressed) {
  blueSound = new Audio((src = "./sounds/" + colorPressed + ".mp3"));
  blueSound.play();
}

function pressButton(colorPressed) {
  $("#" + colorPressed).addClass("pressed");
  setTimeout(() => {
    $("#" + colorPressed).removeClass("pressed");
  }, 100);
}

function flashButton(colorPressed) {
  $("#" + colorPressed).animate({ opacity: 0 }, { duration: 100 });
  $("#" + colorPressed).animate({ opacity: 1 });
}

function checkAnswer(colorPressed) {
  if (colorPressed.length != sequenceColor.length) {
    for (var k = 0; k < colorPressed.length; k++) {
      if (colorPressed[k] != sequenceColor[k]) {
        return "fail";
      } else {
        return "wait";
      }
    }
  } else {
    if (
      colorPressed[colorPressed.length - 1] ===
      sequenceColor[colorPressed.length - 1]
    ) {
      return "pass";
    } else {
      return "fail";
    }
  }
}

function displayGameover() {
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
}

function playGameoverSound() {
  wrong = new Audio((src = "./sounds/wrong.mp3"));
  wrong.play();
}

function generateColor() {
  var randomColorCode = Math.floor(Math.random() * 4);
  if (randomColorCode === 0) {
    return "blue";
  } else if (randomColorCode === 1) {
    return "green";
  } else if (randomColorCode === 2) {
    return "red";
  } else {
    return "yellow";
  }
}
