const slide = document.getElementById("slide")
let doSlide

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.transform(1, 0, 0, -1, 0, canvas.height)

const target = getTarget()
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
  document.addEventListener('keyup', function space(e){
    if (e.code === "Space") {
      clearTimeout(doSlide)
      movePlane() 
      document.removeEventListener("keyup", space);
    }
  })
}

let x = 400;
let y = 30;
let dx = 0;
let dy = 0;

let angle = 0
let direction = "right"

function rotatePlane() {
  drawTarget()
  
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 5, 20);
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
  if (angle >= 0) {
    dx = Math.round(x - XY.x)
    dy = Math.round(y + XY.y)
    
  }else{
    dx = Math.round(x + XY.x)
    dy = Math.round(y + XY.y)
  }
  anglage = setInterval(forwardPlane, 1)
}

function forwardPlane() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTarget()
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 5, 20);
  if (angle >= 0) {
      x -= ((400 - dx)/500)
      y += (( dy-30)/500)
  }else{
      x += ((dx - 400)/500)
      y += (( dy-30)/500)
  } 
  ctx.restore();
  if (Math.round(x) === Math.round(dx) && Math.round(y) === Math.round(dy)) {
    clearInterval(anglage)
  }
}

function getXY(sideC, angle){
  const sideA = sideC * Math.sin(angle)
  const sideB = Math.sqrt((sideC**2) - (sideA**2))
  return {sideA, sideB}
}

function getTrajectory() {
  power = slide.clientWidth;
  let XY = getXY(power, angle)
  moveY = XY.sideB
  moveX = Math.abs(XY.sideA)
  return {y: moveY, x: moveX}
}

 
function slider(direction = "up") {
  const currentWidth = slide.clientWidth 
  if (direction === "up"){slide.style.width = currentWidth + 2 + "px"} 
  if (direction === "down") {slide.style.width = currentWidth - 2 + "px"}
  if (currentWidth === 400){direction = "down"}
  if (currentWidth === 0){direction = "up"}
  sliderLoop(direction)
}

function sliderLoop(direction) {
  doSlide = setTimeout(function() {slider(direction)}, 1)
}

function getTarget() {
  return {x: 400, y:400, w: 100, h: 100}
}

function drawTarget() {
  ctx.fillStyle = "gray"
  ctx.fillRect(target.x, target.y, target.w, target.h)


  ctx.fillStyle = "blue"
  ctx.fillRect(target.x + target.w/2/2, target.y + target.h/2/2, target.w/2, target.h/2)
}