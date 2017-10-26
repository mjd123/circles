const content = document.body.querySelector('.content');
const lineLeft = document.createElement('div');
content.appendChild(lineLeft);
lineLeft.classList.add('line_Left');

const lineRight = document.createElement('div');
content.appendChild(lineRight);
lineRight.classList.add('line_Right');

function lineWalk() {
  lineRight.classList.add('line_Right_Active');
  lineLeft.classList.add('line_Left_Active');
}

window.addEventListener('load', lineWalk);


// pigmants on pageview

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.querySelector("#canvas");
canvas.width = content.clientWidth;
canvas.height = content.clientHeight;
const ctx = canvas.getContext("2d");
console.log(content.clientWidth);

const circle = document.querySelectorAll('.circle');

ctx.lineJoin = "round";
ctx.lineCap = 'round';
//ctx.lineWidth = 5;

let particles = [];
const numberOfParticles = 1;
let circlesDrawn = [];
let point_size = 0;

let clickX = 0;
let clickY = 0;

const radius = 116; //do radius calc instead
let center_x = 0;
let center_y = 0;

let position = {
  top: 0, //center_y
  left: 0, // center_x
  width: 0,
  height: 0
};

let isDrawn = false;
let timeOut;

function circleSuround() {
  circlesDrawn.splice(0, numberOfParticles);

  var rect = this.getBoundingClientRect();

  position.top = rect.top - content.offsetTop; //center_y
  position.left = rect.left + content.offsetLeft; // center_x
  position.width = rect.width / 2;
  position.height = rect.height / 2;

  center_x = position.left + position.width;
  center_y = position.top + position.height;

  point_size = getRandomInt(3, 5);
}

function drawCircle(amount) {
  if (circlesDrawn.length == numberOfParticles) {
    for (var i = 0; i < numberOfParticles; i++) {
      drawPoint(circlesDrawn[i].angle, 1);
      console.log(circlesDrawn.length); //should always be 1
    }
  } else {
    for (var l = 0; l < numberOfParticles; l++) {
      circlesDrawn.push({
        angle: getRandomInt(0, 360),
        distance: 1
      });
      return;
    }

  }
}

function drawPoint(angle, distance) {
  var x = center_x + radius * Math.cos(-angle * Math.PI / 180) * distance;
  var y = center_y + radius * Math.sin(-angle * Math.PI / 180) * distance;
  //var point_size = getRandomInt(5, 10); //random point size
  ctx.beginPath();
  ctx.arc(x, y, point_size, 0, 2 * Math.PI);
  ctx.fill();
}

function movePoints() {
  isDrawn = true;
  for (var i = 0; i < circlesDrawn.length; i++) {
    //console.log(circlesDrawn);
    circlesDrawn[i].angle++;
    //console.log(circlesDrawn[i].angle);
    if (circlesDrawn[i].angle > 360) {
      circlesDrawn[i].angle = 0;
    } else {
      circlesDrawn[i].angle++;
    }

  }
}

var GameLoop = function() {
  clearTimeout(timeOut);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePoints();
  drawCircle();
  timeOut = setTimeout(GameLoop, 1000 / 50);
};

// circles need to position themselfs around images when hovered overflow
//canvas needs to clear when scrolled
// there needs to be a maximum amount of particles on the page
//canvas.addEventListener('mousemove', draw);
for (var i = 0; i < circle.length; i++) {
  circle[i].addEventListener('mouseover', circleSuround);
  circle[i].addEventListener('mouseover', GameLoop);
}
