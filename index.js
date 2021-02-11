const newUserContainer = document.getElementById("username")
const newUserInput = document.getElementById("new-user-input")
const newUserSubmit = document.getElementById("new-user-button")
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
  // fetch("http://localhost:3000/users", configObj)
  // .then(resp => resp.json())
  // .then(json => setUser(json))
  setUser()
}

function setUser(json) {
  // currentUser = new User(json.username)
  currentUser = newUserInput.value
  newUserContainer.style.display = "none"
  new introCard(currentUser)
}


class User {
  constructor(username) {
    this.username = username
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
      card.style.display = "none"
      gameContainer.style.display = "inline-block"
      playGame()
    })
  }
}