function Pointer (ctx) {
    this.ctx = ctx;

    this.w = 34;
    this.h = 34;

    this.img = new Image();
    this.img.src = "./assets/img/pointer.png";

    document.addEventListener('mousemove', function(event){
        this.x = event.clientX - this.w / 2;//le restamos la mitad de su ancho para que se centre al puntero
        this.y = event.clientY - this.h / 2;
    }.bind(this));

    this.setListeners();

    audio = document.getElementById("shoot-sound");
    audio.controls = true;

    bullets = document.getElementsByClassName("bullets");
    

}


Pointer.prototype.draw = function() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}

Pointer.prototype.setListeners = function() {
    document.onkeydown = this.onKeyS.bind(this);
  }
  
Pointer.prototype.onKeyS = function(event) {
    if (event.keyCode === KEY_S) {
      console.log("disparando")
      //audios
      this.loadAudio();
      this.playAudio();
      this.resBullets();
    }
  }



//comandos del audio
Pointer.prototype.playAudio = function() { 
    audio.play(); 
} 
Pointer.prototype.loadAudio = function() { 
    audio.load(); 
} 


//Resta de balas
Pointer.prototype.resBullets = function() {
    if (!bullets === 0) {
        bullets--;
    }
}



  

