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
