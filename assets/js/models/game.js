function Game (canvas) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;

    this.holes = new Holes(this.ctx);
    this.bg = new Background(this.ctx);
    this.houses = new Houses(this.ctx);
    this.cowboy1 = new Cowboy1(this.ctx);

    this.pointer = new Pointer(this.ctx);

    this.activeCowboy = [];
    

    


}

Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
  
    this.clear();
    this.draw();
    this.move();
  
    }.bind(this), DRAW_INTERVAL_MS)
  }
  
  Game.prototype.draw = function() {
    this.holes.draw();
    this.cowboy1.draw();
    this.bg.draw();
    this.houses.draw();
    
    this.pointer.draw();

  }
  

  
  Game.prototype.move = function() {

  }
  
  Game.prototype.clear = function() {
    this.ctx.clearRect(
        0, 
        0, 
        this.ctx.canvas.width, 
        this.ctx.canvas.height
        );
  }

//   Game.prototype.randomHoles = function () {
//     this.holes.sort(function(){
//       return Math.floor(Math.random() * HOLES.length);
//     })
//   };


  Game.prototype.activeCowboy = function () {

  }


  
