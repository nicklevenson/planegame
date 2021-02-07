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
      movePlane() 
    }
  })
}

let x = 350;
let y = 30;
let dx = 0;
let dy = 0;

let angle = 0
let direction = "right"


function rotatePlane() {  
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.fillStyle = 'red';
  ctx.fillRect(-10, -25, 20, 50);
  
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
  ctx.translate(XY.x, XY.y);
  ctx.rotate(angle);
  ctx.fillStyle = 'red';
  if (angle >= 0) {
    ctx.fillRect(x - XY.x, y + XY.y, 20, 50);
  }else{
    ctx.fillRect(x + XY.x, y + XY.y, 20, 50);
  }
    
  
}



function getX(sideB, angle){
  const sideC = sideB / (Math.cos(angle))
  const sideA = Math.sqrt((sideC ** 2) - (sideB ** 2))
  return sideA - 20
}

function getTrajectory() {
  moveY = slide.clientWidth / 2;
  moveX = getX(moveY, angle)
  return {y: moveY, x: moveX}
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

