const slide = document.getElementById("slide")

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.transform(1, 0, 0, -1, 0, canvas.height)

const img = document.getElementById("plane")
const windImg = document.getElementById("wind")

const targetInfo = getTarget()
const target = targetInfo.target
const target2 = targetInfo.target2 
const target3 = targetInfo.target3

//negative wind is a n || e. positive wind is s || w 
let windY = getWind().y
let windX = getWind().x
let windDirection = getWindDirection()
let windAngle = getWindAngle()
let windPower = (((Math.abs(windY) * Math.abs(windX))+1)* 10).toPrecision(3)
let power = 0
let gravity = 0
startRound()

function startRound() {
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
  drawWind()
  drawWindPower()
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = 'red';
  // ctx.fillRect(0, 0, 5, 20);
  ctx.drawImage(img,-20,0,40,50)
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
  // angle += wind
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTarget()
  drawWind()
  drawWindPower()
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = 'red';
  // ctx.fillRect(0, 0, 5, 20);
  ctx.drawImage(img,-20,0,40,50)
  if (angle >= 0) {
      x -= ((400 - dx)/500) 
      y += (( dy-30)/500)

  }else{
      x += ((dx - 400)/500)
      y += (( dy-30)/500)
  
  } 
  ctx.restore();
  
  dy -= windY
  dx -= windX
  if (gravity <= 0) {
    clearInterval(anglage)
    console.log(collision())
   
  }
  gravity -= 1
  
}

function getXY(sideC, angle){
  const sideA = sideC * Math.sin(angle)
  const sideB = Math.sqrt((sideC**2) - (sideA**2))
  return {sideA, sideB}
}

function getTrajectory() {
  power = slide.clientWidth + 150;
  gravity = power * parseInt(windPower) / 10
  let XY = getXY(power, angle)
  let moveY = XY.sideB
  let moveX = Math.abs(XY.sideA)
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
  //range x: 0 - 800; range y: 0 - 500
  const randomX = Math.floor(Math.random() * 600)
  const randomY = 100 + Math.floor(Math.random() * 300)
  const target = {x: randomX, y:randomY, w: 100, h: 100}
  const target2 = {x: target.x + target.w/2/2, y:target.y + target.h/2/2, w: target.w/2, h: target.h/2}
  const target3 = {x:target2.x + target2.w/2/1.5, y:target2.y + target2.h/2/1.5, w: target2.w/3, h: target2.h/3}
  return {target, target2, target3}
}

function drawTarget() {
  //draw Target1
  ctx.fillStyle = "blue"
  ctx.fillRect(target.x, target.y, target.w, target.h)
  //draw Target2
  ctx.fillStyle = "salmon"
  ctx.fillRect(target2.x, target2.y, target2.w, target2.h)
  //draw Target3
  ctx.fillStyle = "gold"
  ctx.fillRect(target3.x, target3.y, target3.w, target3.h)
}

function collision() {
  //boundsX = x >= tx && x < tx + tw
  //boundsY = y >= ty && y < ty + th
  let xAdjust = 0
  let yAdjust = 0
  if (angle >= 0) {
    xAdjust -= getXYAdjust().x
    yAdjust += getXYAdjust().y
  }else{
    xAdjust += getXYAdjust().x
    yAdjust += getXYAdjust().y
  } 
  // ctx.fillStyle="black"
  // ctx.fillRect(x + xAdjust, y+yAdjust, 4,4)
  if ((x + xAdjust >= target3.x && x + xAdjust <= target3.x + target3.w)&&(y + yAdjust>= target3.y && y + yAdjust <= target3.y + target3.h)) {
    return 5
  }
  if ((x + xAdjust >= target2.x && x + xAdjust <= target2.x + target2.w)&&(y + yAdjust >= target2.y && y + yAdjust<= target2.y + target2.h)) {
    return 2
  }
  if ((x + xAdjust >= target.x && x + xAdjust <= target.x + target.w)&&(y + yAdjust >= target.y && y + yAdjust <= target.y + target.h)) {
    return 1
  }else{
    return 0
  }
  
}

function getXYAdjust() {
  let a = 50 * Math.sin(angle)
  let b = Math.sqrt((50**2) - (a**2))
  return {x: Math.abs(a), y: b}
}

function getWind() {
  let xNeg = Math.floor(Math.random() * 2)
  let yNeg = Math.floor(Math.random() * 2)
  let randomX;
  let randomY;
  if (xNeg === 0){
    randomX = -(parseFloat(Math.random().toPrecision(1) ))
  }else{
    randomX = (parseFloat(Math.random().toPrecision(1) ))
  }
  if (yNeg === 0){
    randomY = (parseFloat(Math.random().toPrecision(1) ))
  }else{
    randomY = -(parseFloat(Math.random().toPrecision(1) ))
  }
  return {x: randomX, y: randomY}
}

function drawWind() {
  ctx.save()
  ctx.translate(750, 75)
  ctx.fillStyle = "black"
  ctx.rotate(windAngle + Math.random()/10)
  // ctx.fillRect(-5, -50, 10, 50)
  ctx.drawImage(windImg,-25,-50,50,100)
  ctx.restore();
}

function drawWindPower() {
  ctx.save()
  ctx.transform(1, 0, 0, -1, 0, canvas.height)
  ctx.translate(740, 490)
  ctx.font = "15px Arial";
  ctx.fillText(`${windPower} Mph`, -15, 0);
  ctx.restore();
}

function getWindDirection() {
    //negative wind is n || e. positive wind is s || w 
  if (windY < 0 && windX < 0) {return "NE"}
  if (windY < 0 && windX > 0) {return "NW"}
  if (windY > 0 && windX < 0) {return "SE"}
  if (windY > 0 && windX > 0) {return "SW"}
}

function getWindAngle() {
  if (windDirection === "NW") {return (Math.atan(windY / windX)) - 1.5}
  if (windDirection === "NE") {return (Math.atan(windY / windX)) + 1.5}
  if (windDirection === "SW") {return (Math.atan(windY / windX)) -1.5}
  if (windDirection === "SE") {return (Math.atan(windY / windX)) + 1.5}
  else {
    if (windY === 0 && windX >=0){
      return -(Math.atan(windX / windY))
    }else if (windY === 0 && windX < 0){
      return -(Math.atan(windX / windY))
    }else if (windX === 0 && windY >=0){
      return -(Math.atan(windX / windY))
    }else if (windX === 0 && windY < 0){
      return 3.15
    }
  }
}