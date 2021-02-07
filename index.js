const slide = document.getElementById("slide")
let doSlide

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.transform(1, 0, 0, -1, 0, canvas.height)

startAngle()
function startAngle() {
  anglage = setInterval(moveAnglePlane, 50);
  document.addEventListener('keyup', function space(e){
    if (e.code === "Space") {
      clearInterval(anglage)
      sliderLoop()
      startSlide()
      document.removeEventListener("keyup", space);
    }
  })
}
function startSlide() {
  document.addEventListener('keyup', function(e){
    if (e.code === "Space") {
      clearTimeout(doSlide)
      getTrajectory() 
    }
  })
}

let x = canvas.width/2;
let y = canvas.height/2;
let dx = 0;
let dy = 0;

let angle = 0
let direction = "right"


function rotatePlane() {  
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);

  ctx.fillStyle = 'red';
  ctx.fillRect(20 / -2, 50 / -2, 20, 50);
 
  if (angle >= 1) {
    direction = "left"
  }   
  if (angle <= -1) {
    direction = "right"
  }
 angle = anglePlane(angle, direction)
}
function moveAnglePlane() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  rotatePlane()
  ctx.restore();
}
function anglePlane(angle, direction) {
  if (direction === "right") {
    return angle + 1/10
  }
  if (direction === "left") {
    return angle - 1/10
  }
}

function movePlane() {
  let XY = getTrajectory()
  ctx.fillRect(20 / -2, 50 / -2, 20, 50);
}

function radians_to_degrees(radians){
  let pi = Math.PI;
  return radians * (180/pi);
}

function getX(sideC, angle){
  const sideB = sideC * Math.sin((angle*Math.PI/180))
  const sideA = Math.sqrt((sideC ** 2) - (sideB ** 2))
  return sideA
}

function getTrajectory() {
  moveY = slide.clientWidth * 1.5;
  moveX = getX(moveY, radians_to_degrees(angle))
  return {moveY, moveX}
}

 
function slider(direction = "up") {
  const currentWidth = slide.clientWidth 
  if (direction === "up"){
    slide.style.width = currentWidth + 2 + "px"
  } 
  if (direction === "down") {
    slide.style.width = currentWidth - 2 + "px"
  }
  if (currentWidth === 400){
    direction = "down"
  }
  if (currentWidth === 0){
    direction = "up"
  }
  sliderLoop(direction)
}

function sliderLoop(direction) {
  doSlide = setTimeout(function() {slider(direction)}, 1)
}

