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

    this.cowboys = [];

    document.addEventListener('keyS', this.onKeyEvent.bind(this));

}

Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
  
    this.clear();
    if (this.drawIntervalCount % COWBOY_INTERVAL === 0) {
      this.addCowboy();
      this.drawIntervalCount = 0;
    }
    this.draw();
  
    }.bind(this), DRAW_INTERVAL_MS)
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
  

  
  Game.prototype.show = function() {

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

  //funcion para saber si hay un cowboy y el puntero en la misma posicion
  Game.prototype.onSamePosition = function() {
    
  }

  //funcion para disparar
  Game.prototype.shoot = function() {

  }

  Game.prototype.onKeyEvent = function(event) {
    this.shoot.onKeyEvent(event);
  }



  
