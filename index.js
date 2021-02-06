const plane = document.getElementById("plane")
const slide = document.getElementById("slide")
let doSlide
let doAngle
startAngle()

function startAngle() {
  angleLoop()
  document.addEventListener('keyup', function space(e){
    if (e.code === "Space") {
      clearTimeout(doAngle)
      sliderLoop()
      startSlide()
      document.removeEventListener("keyup", space);
    }
  })
}
function startSlide() {
  document.addEventListener('keyup', function(e){
    if (e.code === "Space") {
      movePlane() 
      
    }
  })
}

function movePlane() {
  clearTimeout(doSlide)
  let distance = slide.clientWidth * 1.5;
  console.log( 1 / (distance / 1000))
  move = setInterval(() => inchPlane(distance), 1 / (distance / 1000));
}

function anglePlane(angle = -45, direction = "right") {
  angle = getAngle(); 
  if (direction === "right") {
    plane.style.transform = `rotate(${angle + 1}deg)`
  }
  if (direction === "left") {
    plane.style.transform = `rotate(${angle - 1}deg)`
  }
  if (angle === -45) {
    direction = "right"
  }   
  if (angle === 45) {
    direction = "left"
  }
  angleLoop(angle, direction)
}

function getAngle() {
  let tr = window.getComputedStyle(plane).transform
  var values = tr.split('(')[1],
  values = values.split(')')[0],
  values = values.split(',');
  let b = values[1];
  return Math.round(Math.asin(b) * (180/Math.PI)); 
}

function angleLoop(angle, direction) {
  doAngle = setTimeout(function() {anglePlane(angle, direction)}, 1)
}

function inchPlane(distance) {
    currentTop = plane.offsetTop
    currentBottom = 650 - currentTop
    if (distance > currentBottom){
      plane.style.bottom = currentBottom + 2 + "px"
    }else{
      clearInterval(move)
    }
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


