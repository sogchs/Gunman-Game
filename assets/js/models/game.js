function Game (canvas) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;
    this.drawIntervalCount = 0;

    this.holes = new Holes(this.ctx);
    this.bg = new Background(this.ctx);
    this.houses = new Houses(this.ctx);
    this.pointer = new Pointer(this.ctx);
    this.failures = [];
    this.hurts = [];
    this.birds = [];
    this.barrels = [];
    this.impacts = [];
    this.cowboys = [];

    this.setListeners();

    audioShoot = document.getElementById("shoot-sound");
    audioShoot.controls = true;

    audioAh = document.getElementById("ah-sound");
    audioAh.controls = true;

    audioBird = document.getElementById("bird");
    audioBird.controls = true;

    audioWood = document.getElementById("wood");
    audioWood.controls = true;

    audioBirdDown = document.getElementById("bird-down");
    audioBirdDown.controls = true;

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

    
    this.birds.forEach(function(bird) {
      bird.draw();
    })

    this.barrels.forEach(function(barrel) {
      barrel.draw();
    })

    this.impacts.forEach(function(impact) {
      impact.draw();
    })

    this.failures.forEach(function(failure) {
      failure.draw();
    })

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
    }.bind(this), 700);
  }


  Game.prototype.addBird = function(){
    var bird = new Bird(this.ctx, this.x, this.y);
    this.birds.push(bird);
  }

  Game.prototype.addBarrel = function(){
    var barrel = new Barrel(this.ctx, this.x, this.y);
    this.barrels.push(barrel);
    console.log("funcion add barrel")
  }

  Game.prototype.addImpact = function(){
    var impact = new Impact(this.ctx, this.x, this.y);
    this.impacts.push(impact);
    
    setTimeout(function() {
      var index = this.impacts.indexOf(impact);
      if (index !== -1) {
        this.impacts.splice(index, 1);
      }
    }.bind(this), 700);
  }

  Game.prototype.addFailure = function(){
    var failure = new Failure(this.ctx, this.x, this.y);
    this.failures.push(failure);
    
    setTimeout(function() {
      var index = this.failures.indexOf(failure);
      if (index !== -1) {
        this.failures.splice(index, 1);
      }
    }.bind(this), 700);
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
    this.timeInterval = undefined;
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
    if (event.keyCode === KEY_S && this.bullets > 0) {
      console.log("disparando")
      this.resBullets();
      
      var cowboy = this.cowboys.find(function(cowboy) {
        return cowboy.onSamePositionCowboy(this.pointer);
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
      else {
        console.log("Herido");
        this.addFailure();
        $('#dollars').empty();
        this.dollars--;
        $('#dollars').text(this.dollars + '$');
      }

      //condicion sin nos quedamos con 10 bullets
      if(this.bullets === 10){
        this.addBird();
        this.playAudioBird();
      }
      var bird = this.birds.find(function(bird) {
        return bird.onSamePositionBird(this.pointer);
      }.bind(this)
      );
      if (bird) {
        console.log(this.birds);
        this.bullets = this.bullets + 15;
        $('#bullets').text(this.bullets);
        this.birds.splice(bird);
        console.log(this.birds);
        this.addImpact();
        this.playAudioBirdDown();
      }

      //audios del disparo
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

Game.prototype.playAudioBird = function() { 
  audioBird.play(); }

Game.prototype.playAudioWood = function() { 
  audioWood.play(); }
  
Game.prototype.playAudioBirdDown = function() { 
  audioBirdDown.play(); }


//Resta de balas
Game.prototype.resBullets = function() {
  $('#bullets').empty();
  this.bullets--;
  $('#bullets').text(this.bullets);
}


Game.prototype.timeGame = function() {
  var timeInterval = setInterval(timeFunction.bind(this), 1000);
  function timeFunction() {
    if (this.bullets > 0 || this.count > 0){
      this.count--; 
      this.time.innerHTML = this.count;
    }
    if (this.count === 0 || this.bullets === 0) {
      clearInterval(timeInterval);
      this.gameOver();
    }
          
    //condicion sin nos quedamos con 6 segundos
    if(this.count === 6){
    this.addBarrel();
    console.log("En tiempo");
    }
    var barrel = this.barrels.find(function(barrel) {
      return barrel.onSamePositionBarrel(this.pointer);
    }.bind(this)
    );
    if (barrel) {
      console.log(this.barrel);
      this.count = this.count + 10;
      $('#time').text(this.count);
      this.barrels.splice(barrel);
      console.log(this.barrels);
      this.addImpact();
      this.playAudioWood();
          }
  }
}


