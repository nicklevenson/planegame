const woosh = new Woosh
const land = new Land 
const scoreSound = new Score
const bullseye = new Bullseye
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
let throwCountTitle = document.getElementById("throw-count")
let throwCount;
const score = document.getElementById("score")
const roundTag = document.getElementById("round")
const control = document.getElementById("control")
const controlTxt = document.getElementById("controlTxt")
const gameStats = document.getElementById("gameStats")
const planeGameTitle = document.getElementById("plane-game-title")
newUserSubmit.addEventListener('click', submitUser)

planeGameTitle.addEventListener('click', changeTitle)

function changeTitle() {
  let titleArr = planeGameTitle.innerText.split("")
  
  planeGameTitle.innerText = titleArr.reverse().join("")
}

function submitUser() {
  const username = newUserInput.value.trim()
  if (username === "") {
    alert("Please enter a username.")
    return
  }
  woosh.play()
  setUser(findOrCreateUser(username))
}

function setUser(user) {
  currentUser = new User(user.id, user.username, [])
  newUserInputs.remove()
  new introCard(user.username)
  amb = new Ambience
  amb.play()
}

function getUserInfo() {
  const user = getUser(currentUser.id)
  currentUser = new User(user.id, user.username, user.scores)
  currentUser.renderCard()
}

function newLeaderboard() {
  const board = getLeaderboard()
  new Leaderboard(board.scores).renderCard()
  throwCount = board.all * 10
  throwCountTitle.innerText = `(${throwCount} throws and counting!)`
}
