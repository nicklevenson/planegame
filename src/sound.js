class Ambience {
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.src = 'assets/ambiance.wav';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = true;
    document.body.appendChild(this.sound);
  }

  play(){
    this.sound.play();
  }
  stop(){
    this.sound.pause();
  }

}

class Woosh {
  constructor() {
    this.sound = document.createElement("audio");
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