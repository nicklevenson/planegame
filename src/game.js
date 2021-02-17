
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
      control.innerText = "Game Over! Play Again?"
      control.addEventListener('click', function restart(){
        playGame()
        control.removeEventListener('click',restart)
      })
    }
  }

  function addScore(s) {
    control.style.backgroundColor = "tomato"
    control.innerText = "Next Round"
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
    fetch("https://planegame-api.herokuapp.com/scores", configObj)
    .then(function(){newLeaderboard(); getUserInfo()})
    .catch(e => alert("Connection issues. Scores may not be recorded."))
  }

