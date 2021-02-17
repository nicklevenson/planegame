class Ambience {
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.id = "music"
    this.sound.src = 'assets/ambiance.wav';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = true;
    document.body.appendChild(this.sound);
  }
 

  play(){
    this.sound.play();
    let toggle = document.getElementById("toggle-music")
    toggle.innerText = "Sound Off"
    toggle.addEventListener("click", e => {this.stop(); toggle.removeEventListener('click', e)})
  }
  stop(){
    this.sound.pause();
    let toggle = document.getElementById("toggle-music")
    toggle.innerText = "Sound On"
    toggle.addEventListener("click", e => {this.play(); toggle.removeEventListener('click', e)})
    
  }

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
    this.sound.play();
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
    this.sound.play();
  }
  stop(){
    this.sound.pause();
  }
}