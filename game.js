
  const leaderboard = document.getElementById("leaderboard")
  const score = document.getElementById("score")
  const roundTag = document.getElementById("round")
  const control = document.getElementById("control")
  const controlTxt = document.getElementById("controlTxt")
  const gameStats = document.getElementById("gameStats")
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
      newRound()
      roundTag.innerText = `Round: ${round}/10`
      round ++
    }else {
      submitScoreToDb(tally)
      
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

  function submitScoreToDb(tally) {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        score:{
          score: tally,
          user_id: currentUser.id
        }
      })
    }
    fetch("http://localhost:3000/scores", configObj)
    .then(function(){newLeaderboard()})
    
  }

