window.addEventListener('load', e=>{newGame()})
const score = document.getElementById("score")
let tally = 0;
function newGame() {
  
  newRound()
}

function addScore(s) {
  tally += s
  score.innerText = `Score: ${tally}`
  document.addEventListener('click', function restart(){
    newGame()
    document.removeEventListener('click',restart)
  })
 
}