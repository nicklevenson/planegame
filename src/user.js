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
