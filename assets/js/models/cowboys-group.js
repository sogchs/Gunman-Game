function CowboyGroup (ctx) {
    this.ctx = ctx;

    this.cowboys = [];

    this.drawCounter = 0;
}


CowboyGroup.prototype.draw = function() {
    this.drawCounter++;
  
    this.generateCowboy();
  
    this.cowboys.forEach(function(c) {
      c.draw();
    });
  
    this.cleanCowboys();
  };

CowboyGroup.prototype.move = function() {
    this.obstacles.forEach(function(c) {
      c.move();
    });
  };
  

CowboyGroup.prototype.generateCowboy = function() {

    var random = Math.floor(Math.random() * this.cowboys.length);
  
    if (this.drawCounter % random === 0) {
      this.drawCounter = 0;
  
      this.cowboys.push(
        new Cowboy1(this.ctx)
      );
    }
  };
  
  ObstacleCollection.prototype.cleanCowboys = function() {
  };