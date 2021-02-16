class loadCard {
  constructor() {
    this.renderCard();
  }
  renderCard() {
    let card = document.getElementById("loading")
    card.style.display = "inline-block"
  }
  hideCard() {
    let card = document.getElementById("loading")
    card.style.display = "none"
  }
}