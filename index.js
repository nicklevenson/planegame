const leaderboardContainer = document.getElementById("leaderboardContainer")
const leaderboard = document.getElementById("leaderboard")
const usernameContainer = document.getElementById("username-container")
const newUserContainer = document.getElementById("username")
const newUserInputs = document.getElementById("username-inputs")
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
  fetch("https://planegame-api.herokuapp.com/users", configObj)
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
  newUserInputs.remove()

  new introCard(currentUser.username)
}
function getUserInfo() {
  fetch(`https://planegame-api.herokuapp.com/users/${currentUser.id}`)
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
    userCard.innerHTML += `<h3>${currentUser.username}'s Scores</h3>`
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
    newUserContainer.append(card)
    card.innerHTML = `This is the story of ${this.username}. One day ${this.username} was bored at the park. ${this.username} had a notebook of paper and a quilt in their bag.  ${this.username} laid the quilt on the ground and noticed it looked an awful lot like a target. It dawned on ${this.username} that the perfect way to spend this lovely afternoon was to throw a paper airplane at this target...`
    card.innerHTML +=  `<br><button id="ready-to-fly">Ready to fly.</button>`
    let button = document.getElementById('ready-to-fly')
    button.addEventListener("click", (e) => {
      usernameContainer.remove()
      gameContainer.style.display = "inline-block"
      newLeaderboard()
      currentUser.renderCard()
      playGame()
    })
  }
}

function newLeaderboard() {
  fetch("https://planegame-api.herokuapp.com/scores")
  .then(resp => resp.json())
  .then(function(json) {
    let leaderboardObject = new Leaderboard(json)
    leaderboardObject.renderCard()
  })
  setTimeout(newLeaderboard, 5000)
 
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