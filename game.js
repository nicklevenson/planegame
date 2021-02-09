window.addEventListener('load', e=>{newGame()})
const score = document.getElementById("score")
const roundTag = document.getElementById("round")
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
  tally += s
  score.innerText = `Score: ${tally}`
  document.addEventListener('click', function restart(){
    newGame()
    document.removeEventListener('click',restart)
  })
}