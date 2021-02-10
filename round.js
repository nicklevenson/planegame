
  function newRound(){
  const slideContainer = document.getElementById("speedSlider")
  const slide = document.getElementById("slide")
  let canvas = document.getElementById("myCanvas");


  //sizing
  canvas.height = (document.body.offsetHeight * .75)
  canvas.width = canvas.height * .75 - 100
  gameStats.style.width = canvas.width + "px"
  let planeW = canvas.height * .05;
  let planeH = planeW * 1.25;

  let targetW = canvas.height * .125;
  let targetH = targetW;

  slideContainer.style.height = (canvas.height) + "px"
  let slideH = slideContainer.offsetHeight

  let windW = 25
  let windH = 50

  let ctx = canvas.getContext("2d");
  ctx.transform(1, 0, 0, -1, 0, canvas.height)

  //assets
  const img = document.getElementById("plane")
  const windImg = document.getElementById("wind")

  //calibration
  

  //negative wind is a n || e. positive wind is s || w 
  let windY = getWind().y
  let windX = getWind().x
  // let windY = 0
  // let windX = 0
  let windDirection = getWindDirection()
  let windAngle = getWindAngle()
  // let windPower = (((Math.abs(windY) * Math.abs(windX))+1)* 10).toPrecision(3)
  let windPower = ((Math.sqrt((Math.abs((windX*100)**2)) + (Math.abs((windY*100)**2))))).toPrecision(3)

  let power = 0
  
  let gravity = canvas.height
  // let gravity = 800

  const targetInfo = getTarget()
  const target = targetInfo.target
  const target2 = targetInfo.target2 
  const target3 = targetInfo.target3

  //start a round
  startRound()

  function startRound() {
    controlTxt.innerText = "Angle..."
    anglage = setInterval(moveAnglePlane, 50);
    control.addEventListener('click', function space(e){
        controlTxt.innerText = "Power..."
       
        clearInterval(anglage)
        sliderLoop()
        startSlide()
        control.removeEventListener("click", space);
      
    })
  }
  function startSlide() {
    control.addEventListener('click', function space(e){
        controlTxt.innerText = "Woosh!"
        control.style.backgroundColor = "grey"
        clearTimeout(doSlide)
        movePlane() 
        control.removeEventListener("click", space);
        
      
    })
  }

  let x = canvas.width/2;
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
    ctx.drawImage(img,-(planeW/2),0,planeW,planeH)
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
    // gravity = Math.round(((Math.sqrt((XY.x**2) + (XY.y**2)))))+100
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
    ctx.drawImage(img,-(planeW/2),0,planeW,planeH)
    if (angle >= 0) {
        x -= (((canvas.width/2) - dx)/canvas.height) 
        y += (( dy-30)/canvas.height)

    }else{
        x += ((dx - (canvas.width/2))/canvas.height)
        y += (( dy-30)/canvas.height)
    
    } 
    ctx.restore();
    
    dy -= windY
    dx -= windX
    if (gravity <= 0) {
      clearInterval(anglage)
      console.log(collision())
      ctx.restore()
      slide.style.height = 0
      addScore(collision())
    }
    gravity -= 1
    // ctx.translate(x, y);
    
  }

  function getXY(sideC, angle){
    const sideA = sideC * Math.sin(angle)
    const sideB = Math.sqrt((sideC**2) - (sideA**2))
    return {sideA, sideB}
  }

  function getTrajectory() {
    power = slide.clientHeight;
    let XY = getXY(power, angle)
    let moveY = XY.sideB
    let moveX = Math.abs(XY.sideA)
    return {y: moveY, x: moveX}
  }

  
  function slider(direction = "down") {
    const currentHeight = slide.offsetHeight
    if (direction === "up"){slide.style.height = currentHeight + 2 + "px"} 
    if (direction === "down") {slide.style.height = currentHeight - 2 + "px"}
    if (currentHeight >= slideH){direction = "down"}
    if (currentHeight === 0){direction = "up"}
    sliderLoop(direction)
  }

  function sliderLoop(direction) {
    doSlide = setTimeout(function() {slider(direction)}, 1)
  }

  function getTarget() {
    //range x: 0 - 800; range y: 0 - 500
    let randomY;
    const randomX = Math.floor(Math.random() * (canvas.width/2))+ (targetW)
    if (windDirection === "SE" || windDirection === "SW"){
      randomY = Math.floor(Math.random() * (canvas.height/2)) + targetH
    }else{
      randomY = Math.floor(Math.random() * (canvas.height - (targetH*3))) + targetH*2
    }
    
    const target = {x: randomX, y:randomY, w: targetW, h: targetH}
    const target2 = {x: target.x + target.w/2/2, y:target.y + target.h/2/2, w: target.w/2, h: target.h/2}
    const target3 = {x:target2.x + target2.w/2/1.5, y:target2.y + target2.h/2/1.5, w: target2.w/3, h: target2.h/3}
    return {target, target2, target3}
  }

  function drawTarget() {
    //draw Target1
    ctx.fillStyle = "lightblue"
    ctx.fillRect(target.x, target.y, target.w, target.h)
    //draw Target2
    ctx.fillStyle = "salmon"
    ctx.fillRect(target2.x, target2.y, target2.w, target2.h)
    //draw Target3
    ctx.fillStyle = "red"
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
    let a = planeH * Math.sin(angle)
    let b = Math.sqrt((planeH**2) - (a**2))
    return {x: Math.abs(a), y: b}
  }

  function getWind() {
    let xNeg = Math.floor(Math.random() * 2)
    let yNeg = Math.floor(Math.random() * 2)
    let randomX;
    let randomY;
    if (xNeg === 0){
      randomX = -(parseFloat(Math.random().toPrecision(1) )-.3)
    }else{
      randomX = (parseFloat(Math.random().toPrecision(1) )-.3)
    }
    if (yNeg === 0){
      randomY = (parseFloat(Math.random().toPrecision(1)) -.3)
    }else{
      randomY = -(parseFloat(Math.random().toPrecision(1))-.3)
    }
    return {x: randomX, y: randomY}
  }

  function drawWind() {
    ctx.save()
    ctx.translate(canvas.width-50, canvas.height*.1)
    ctx.fillStyle = "black"
    ctx.rotate(windAngle + Math.random()/10)
    // ctx.fillRect(-5, -50, 10, 50)
    ctx.drawImage(windImg,-(windW/2),-(windH/2),windW,windH)
    ctx.restore();
  }

  function drawWindPower() {
    ctx.save()
    ctx.transform(1, 0, 0, -1, 0, canvas.height)
    ctx.translate(canvas.width-70, canvas.height*.98)
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
        return -1.5
      }else if (windY === 0 && windX < 0){
        return 1.5
      }else if (windX === 0 && windY >=0){
        return 0
      }else if (windX === 0 && windY < 0){
        return 3.15
      }
    }
  }
}
