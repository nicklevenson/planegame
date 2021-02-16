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