window.addEventListener('load', e=>{playGame()})

  let score = document.getElementById("score")
  let roundTag = document.getElementById("round")
  let control = document.getElementById("control")
  let controlTxt = document.getElementById("controlTxt")
  let gameStats = document.getElementById("gameStats")
  let round = 1;
  let tally = 0;

  function playGame() {
    round = 1;
    tally = 0;
    score.innerText = `Score: ${tally}`
    newGame()
  }
  function newGame() {
    if (round < 11) {
      console.log(round)
      newRound()
      roundTag.innerText = `Round: ${round}/10`
      round ++
    }else {
      console.log("done")
      roundTag.innerText = `Game Over.`
      controlTxt.innerText = "Play Again?"
      control.addEventListener('click', function restart(){
        playGame()
        control.removeEventListener('click',restart)
      })
    }
  }

  function addScore(s) {
    control.style.backgroundColor = "tomato"
    controlTxt.innerText = "Next Round"
    tally += s
    score.innerText = `Score: ${tally}`
    control.addEventListener('click', function restart(){
      
      newGame()
      control.removeEventListener('click',restart)
    })
  }

