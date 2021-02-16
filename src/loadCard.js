class loadCard {
  constructor() {
    this.renderCard();
  }
  renderCard() {
    let card = document.createElement('div')
    card.id = "loadContent"
    card.innerHTML = `<br>
    <div id="loading" class="rotating">
      <img src="assets/plane.png">
    </div>
    <h2>loading...</h2>`
    username.append(card)
  }
  hideCard() {
    let card = document.getElementById("loadContent")
    card.innerHTML = ''
    card.remove()
  }
}