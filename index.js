const leaderboardContainer = document.getElementById("leaderboardContainer")
const leaderboard = document.getElementById("leaderboard")
const newUserContainer = document.getElementById("username")
const newUserInput = document.getElementById("new-user-input")
const newUserSubmit = document.getElementById("new-user-button")
const leaderboardList = document.getElementById("leaderboardList")

let currentUser;


const gameContainer = document.getElementById("container")

newUserSubmit.addEventListener('click', e => submitUser())

function submitUser() {
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
  fetch("http://localhost:3000/users", configObj)
  .then(resp => resp.json())
  .then(function(json){
    if (json.error === undefined){
      setUser(json)
    }else{
      alert(json.error.message)
    }
    })
  .catch(function(error){ alert(error)})
}

function setUser(json) {
  currentUser = (new User(json.id, json.username, json.scores))
  // currentUser = newUserInput.value
  newUserContainer.remove()
  new introCard(currentUser.username)
}
function getUserInfo() {
  fetch(`http://localhost:3000/users/${currentUser.id}`)
  .then(resp => resp.json())
  .then(function(json) {
    currentUser = (new User(json.id, json.username, json.scores))
    currentUser.renderCard()
  })
}

class User {
  constructor(id, username, scores) {
    this.id = id
    this.username = username
    this.scores = scores
  }

  renderCard(){
    const userCard = document.getElementById("userScore")
    userCard.innerHTML = ''
    userCard.innerHTML += `<h3>${currentUser.username}'s Scores</h3><hr>`
    userCard.innerHTML += `<div id="userScoreList"></div>`
    let cardList = document.getElementById("userScoreList")
    this.scores.forEach(function(s) {
      cardList.innerHTML += `<li>${s}</li>`
    })
  }
}

class introCard{
  constructor(username) {
    this.username = username
    this.renderCard()
  }
  renderCard(){
    let card = document.createElement('div')
    card.className = "introCard"
    document.body.append(card)
    card.innerHTML = `This is the story of ${this.username}.`
    card.innerHTML +=  `<button id="ready-to-fly">Ready to fly.</button>`
    let button = document.getElementById('ready-to-fly')
    button.addEventListener("click", (e) => {
      card.remove()
      gameContainer.style.display = "inline-block"
      newLeaderboard()
      currentUser.renderCard()
      playGame()
    })
  }
}

function newLeaderboard() {
  fetch("http://localhost:3000/scores")
  .then(resp => resp.json())
  .then(function(json) {
    let leaderboardObject = new Leaderboard(json)
    leaderboardObject.renderCard()
  })
}

class Leaderboard {
  constructor(scores) {
    this.scores = scores
  }

  renderCard() {
    leaderboardList.innerHTML = ''
    let list = this.scores.map(s => `<li>${s}</li>`)
    list.forEach(function(l) {
      leaderboardList.innerHTML += l
    })
  }
}