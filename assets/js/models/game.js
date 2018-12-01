function Game (canvas) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;
    this.drawIntervalCount = 0;

    this.holes = new Holes(this.ctx);
    this.bg = new Background(this.ctx);
    this.houses = new Houses(this.ctx);
    this.pointer = new Pointer(this.ctx);
    this.hurts = [];

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

   // volver a empezar desde el boton try again "No funciona"
    $("#try-again").click(function(){
      this.start();
});
}

Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
  
    this.clear();
    if (this.drawIntervalCount % COWBOY_INTERVAL === 0) {
      this.addCowboy();
      this.drawIntervalCount = 0;
    }
    this.draw();

    if (this.bullets <= 0) {
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

    this.hurts.forEach(function(hurt) {
      hurt.draw();
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
      if (index !== -1){
        this.cowboys.splice(index, 1);
      } 
    }.bind(this), 2000);
  
  }

 

  Game.prototype.addHurt = function(){
    var hurt = new Hurt(this.ctx, this.x, this.y);
    this.hurts.push(hurt);
    
    setTimeout(function() {
      var index = this.hurts.indexOf(hurt);
      if (index !== -1) {
        this.hurts.splice(index, 1);
      }
    }.bind(this), 1000);
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
    clearInterval(this.intervalId);
    this.drawIntervalId = undefined;
  }



  Game.prototype.gameOver = function() {
    this.stop();

    $('#pop-up').removeClass('pop-up-off').addClass('pop-up-on');

    $('#reward').empty();
    $('#reward').text(this.dollars + '$');
  }


  Game.prototype.setListeners = function() {
    document.onkeydown = this.onKeyS.bind(this);
  }

  Game.prototype.onKeyS = function(event) {
    if (event.keyCode === KEY_S && this.bullets >= 0) {
      console.log("disparando")
      this.resBullets();
      console.log(this.cowboys);
      var cowboy = this.cowboys.find(function(cowboy) {
        return cowboy.onSamePosition(this.pointer);
      }.bind(this)
      );

      if (cowboy) {
        console.log('sangre');
        $('#dollars').empty();
        this.dollars++;
        $('#dollars').text(this.dollars + '$');
    
        this.playAudioAh();
         //aqui quiero que pinte la sangre y esta pintura desaparezca en un segund
        this.addHurt();
      }

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
  if (this.bullets > 0 || this.count > 0){
    this.count--; 
    this.time.innerHTML = this.count;
    if(this.count === 0){
      this.gameOver();
     }
  }
 

 }.bind(this), 1000);
}


