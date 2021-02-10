let newUserInput = document.getElementById("new-user-input")
const newUserSubmit = document.getElementById("new-user-button")

newUserSubmit.addEventListener('click', e => submitUser())

function submitUser() {
  console.log(newUserInput.value)
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
}