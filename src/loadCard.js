class loadCard {
  constructor(node) {
    this.renderCard(node);
  }
  renderCard(node) {
    let card = document.createElement('div')
    card.id = "loadContent"
    card.innerHTML = `<br>
    <div id="loading" class="rotating">
      <img src="assets/plane.png">
    </div>
    <h2>loading...</h2>`
    node.prepend(card)
  }
  hideCard() {
    let card = document.getElementById("loadContent")
    card.innerHTML = ''
    card.remove()
  }
}