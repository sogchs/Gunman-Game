function Game (canvas) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;
    this.drawIntervalCount = 0;

    this.holes = new Holes(this.ctx);
    this.bg = new Background(this.ctx);
    this.houses = new Houses(this.ctx);
    this.cowboy = new Cowboy(this.ctx);
    this.cowboy2 = new Cowboy(this.ctx);
    this.pointer = new Pointer(this.ctx);
    this.hurt = new Hurt(this.ctx);

    this.cowboys = [];

    this.setListeners();

    audioShoot = document.getElementById("shoot-sound");
    audioShoot.controls = true;

    audioAh = document.getElementById("ah-sound");
    audioAh.controls = true;

    this.dollars = 0;
    this.bullets = 50;

    this.count = 60;
    this.time = document.getElementById('time');
    this.timeInterval = undefined;
   

}

Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
  
    this.clear();
    if (this.drawIntervalCount % COWBOY_INTERVAL === 0) {
      this.addCowboy();
      this.drawIntervalCount = 0;
    }
    this.draw();

    if (this.bullets <= -1) {
      this.gameOver();
    }
  
    }.bind(this), DRAW_INTERVAL_MS)

    this.timeGame();
  }
  
  Game.prototype.draw = function() {
    this.holes.draw();

    this.cowboys.forEach(function(cowboy) {
      cowboy.draw();
    })
    
    this.bg.draw();
    this.houses.draw();
    
    this.pointer.draw();
    this.drawIntervalCount++;

  }
  

  Game.prototype.addCowboy = function(){
    var cowboy = new Cowboy(this.ctx);
    this.cowboys.push(cowboy);
    setTimeout(function() {
      var index = this.cowboys.indexOf(cowboy);
      this.cowboys.splice(index, 1);
    }.bind(this), 2000);
  }


  
  Game.prototype.clear = function() {
    this.ctx.clearRect(
        0, 
        0, 
        this.ctx.canvas.width, 
        this.ctx.canvas.height
        );
  }

  //a este le tengo que asignar un boton para que pare el juego a parte de que se ejecute cuanto termine el tiempo
  Game.prototype.stop = function () {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }



  Game.prototype.gameOver = function() {
    $('#pop-up').removeClass('pop-up-off').addClass('pop-up-on');
    this.stop();

    $('#reward').empty();
    $('#reward').text(this.dollars + '$');
  }


  Game.prototype.setListeners = function() {
    document.onkeydown = this.onKeyS.bind(this);
  }
  
  Game.prototype.onKeyS = function(event) {
    if (event.keyCode === KEY_S) {
      console.log("disparando")
      this.resBullets();
        
      console.log(this.dollars);
      if (this.cowboy.onSamePosition(this.pointer)) {
        console.log('sangre');
        $('#dollars').empty();
        this.dollars++;
        $('#dollars').text(this.dollars + '$');
    
        this.playAudioAh();

        setTimeout(function() {
          this.hurt.draw();
        }.bind(this), 3000);
        //aqui quiero que pinte la sangre y esta pintura desaparezca en un segundo
      };
      //audios
      this.loadAudioShoot();
      this.playAudioShoot();
      
    }
  }



//comandos del audio
Game.prototype.playAudioShoot = function() { 
    audioShoot.play(); 
} 
Game.prototype.loadAudioShoot = function() { 
    audioShoot.load(); 
} 
Game.prototype.playAudioAh = function() { 
  audioAh.play(); }


//Resta de balas
Game.prototype.resBullets = function() {
  $('#bullets').empty();
  this.bullets--;
  $('#bullets').text(this.bullets);
}

//Tiempo regresivo
Game.prototype.timeGame = function(){
  this.timeInterval = setInterval(function(){
  this.count--; 
  this.time.innerHTML = this.count;
    if(this.count <= 0){
      clearInterval(this.time);
      this.gameOver();
     }
 }.bind(this), 1000);
}


