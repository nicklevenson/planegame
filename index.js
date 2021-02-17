const woosh = new Woosh
const land = new Land 
const scoreSound = new Score
const leaderboardContainer = document.getElementById("leaderboardContainer")
const leaderboard = document.getElementById("leaderboard")
const usernameContainer = document.getElementById("username-container")
const newUserContainer = document.getElementById("username")
const newUserInputs = document.getElementById("username-inputs")
const newUserInput = document.getElementById("new-user-input")
const newUserSubmit = document.getElementById("new-user-button")
const leaderboardList = document.getElementById("leaderboardList")
const userCard = document.getElementById("userScore")
let currentUser;
const gameContainer = document.getElementById("container")

newUserSubmit.addEventListener('click', submitUser)

function submitUser() {
  woosh.play()
  newUserSubmit.removeEventListener('click', submitUser)
  let loading = new loadCard(newUserContainer)
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: newUserInput.value
    })
  }
  fetch("https://planegame-api.herokuapp.com/users", configObj)
  .then(resp => resp.json())
  .then(function(json){
    if (json.error === undefined){
      setUser(json)
      loading.hideCard()
    }else{
      alert(json.error.message)
      loading.hideCard()
    }
    newUserSubmit.addEventListener('click', submitUser)
    })
  .catch(function(error){ 
    alert("Please check your internet connection.")
    newUserSubmit.addEventListener('click', submitUser)
    loading.hideCard()
  })
  
}

function setUser(json) {  
  currentUser = (new User(json.id, json.username, json.scores))
  newUserInputs.remove()
  new introCard(currentUser.username)
  amb = new Ambience
  amb.play()
}
function getUserInfo() {
  new loadCard(userCard)
  fetch(`https://planegame-api.herokuapp.com/users/${currentUser.id}`)
  .then(resp => resp.json())
  .then(function(json) {
    currentUser = (new User(json.id, json.username, json.scores))
    currentUser.renderCard()
  })
  .catch(e => alert("Connection issues. Scores may not be recorded."))
}

function newLeaderboard() {
  let loading = new loadCard(leaderboard)
  fetch("https://planegame-api.herokuapp.com/scores")
  .then(resp => resp.json())
  .then(function(json) {
    loading.hideCard()
    let leaderboardObject = new Leaderboard(json.scores)
    leaderboardObject.renderCard()
    let title = document.getElementById("throw-count")
    title.innerText = `(${json.all * 10} throws and counting!)`
  })
  .catch(e => alert("Connection issues. Scores may not be recorded."))
  // setTimeout(newLeaderboard, 5000)
}

