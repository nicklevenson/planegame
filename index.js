const newUserContainer = document.getElementById("username")
const newUserInput = document.getElementById("new-user-input")
const newUserSubmit = document.getElementById("new-user-button")
let currentUser;

const gameContainer = document.getElementById("container")

newUserSubmit.addEventListener('click', e => submitUser())

function submitUser() {
  console.log(newUserInput.value)
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
  newUserContainer.style.display = "none"
  gameContainer.style.display = "inline-block"
  playGame()
}

class User {
  constructor(username) {
    this.username = username
  }


}