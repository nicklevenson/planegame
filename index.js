const slide = document.getElementById("slide")
let doSlide

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.transform(1, 0, 0, -1, 0, canvas.height)



let x = canvas.width/2;
let y = canvas.height-630;
let dx = 0;
let dy = 0;



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
    ctx.rect(x,y,20,20)
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    x += dx
    y += dy
}
setInterval(draw, 10);





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