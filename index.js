const plane = document.getElementById("plane")
const slide = document.getElementById("slide")

document.addEventListener('keyup', function(e){
  if (e.code === "Space") {movePlane(); clearTimeout(doSlide)}
})

function movePlane() {
  let distance = slide.clientWidth * 1.5;
  // plane.style.bottom = currentBottom + distance + "px"
  console.log( 1 / (distance / 1000))
  move = setInterval(() => inchPlane(distance), 1 / (distance / 1000));
}

function anglePlane(angle = "90") {
 
  angleLoop(angle)
}

function angleLoop() {
  doAngle = setTimeout(function() {anglePlane(angle)}, 1)
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

sliderLoop()


