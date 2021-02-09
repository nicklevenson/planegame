window.addEventListener('load', e=>{newGame()})
const score = document.getElementById("score")
const roundTag = document.getElementById("round")
const control = document.getElementById("control")
let round = 1;
let tally = 0;
function newGame() {
  if (round < 11) {
    console.log(round)
    newRound()
    roundTag.innerText = `Round: ${round}/10`
    round ++
  }else {
    console.log("done")
    roundTag.innerText = `Game Over.`
  }
}

function addScore(s) {
  control.innerText = "Next Round"
  tally += s
  score.innerText = `Score: ${tally}`
  control.addEventListener('click', function restart(){
    
    newGame()
    control.removeEventListener('click',restart)
  })
}