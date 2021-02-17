class Ambience {
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.id = "music"
    this.sound.src = 'assets/ambiance.wav';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = false;
    document.body.appendChild(this.sound);
    this.sound.addEventListener('ended', e => {
      let randomNum = Math.floor(Math.random() * 6)
      if (randomNum < 4) {
        this.sound.src = "assets/ambiance.wav"
      }else{ 
        this.sound.src = 'assets/jazz.flac'
      }
      this.sound.play()
    })
  }
   
  play(){
    this.sound.play();
    let toggle = document.getElementById("toggle-music")
    toggle.innerText = "Music Off"
    toggle.addEventListener("click", e => {this.stop(); toggle.removeEventListener('click', e)})
  }
  stop(){
    this.sound.pause();
    let toggle = document.getElementById("toggle-music")
    toggle.innerText = "Music On"
    toggle.addEventListener("click", e => {this.play(); toggle.removeEventListener('click', e)})
  }
}


const fxToggle = document.getElementById("toggle-fx")
fxOn()
function fxOn() {
  fxToggle.innerText = "Sound FX Off"
  fxToggle.value = "on"
  fxToggle.addEventListener("click", function fxToggler(e) {
    fxToggle.value = "off"
    fxToggle.innerText = "Sound FX On"
    fxToggle.removeEventListener("click", fxToggler)
    fxToggle.addEventListener("click", fxOn)
  })
}


class Woosh {
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.id = "woosh"
    this.sound.src = 'assets/woosh.flac';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }


  play(){
    if (fxToggle.value === "on"){
      this.sound.play();
    }
  }
  stop(){
    this.sound.pause();
  }
}

class Land{
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.id = "land"
    this.sound.src = 'assets/land.mp3';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  play(){
    if (fxToggle.value === "on"){
      this.sound.play();
    }
  }
  stop(){
    this.sound.pause();
  }
}
class Score{
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.id = "score"
    this.sound.src = 'assets/success.wav';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  play(){
    if (fxToggle.value === "on"){
      this.sound.play();
    }
  }
  stop(){
    this.sound.pause();
  }
}