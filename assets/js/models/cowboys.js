function Cowboy (ctx) {
    this.ctx = ctx;

    //posición aleatoria
    var randomHole = HOLES[Math.floor(Math.random() * HOLES.length)];
    this.x = randomHole.x;
    this.y = randomHole.y;

    this.w = 77;
    this.h = 113;

    this.img = new Image();

    //obtener una imagen de cowboy aleatoria
    var n = [1, 2, 3];
    var nRamdom = n[Math.floor(Math.random() * n.length)];
    

    this.img.src = "./assets/img/cowboy" + nRamdom + ".png";
    this.img.frames = 4;
    this.img.frameIndex = 0;
    this.drawCount = 0;

}


Cowboy.prototype.draw = function() {
    this.drawCount++;
    this.ctx.drawImage(
        this.img,
        this.img.width * this.img.frameIndex / this.img.frames,
        0,
        this.img.width / this.img.frames,
        this.img.height,
        this.x,
        this.y, 
        this.w, 
        this.h
    );
    
    if (this.drawCount % 12 === 0) {
      this.animate();
      this.drawCount = 0;
    }
}

Cowboy.prototype.animate = function() {
    this.img.frameIndex++;
    if (this.img.frameIndex === this.img.frames) {
      this.img.frameIndex = 0;
    }
}


Cowboy.prototype.onSamePosition = function(pointer) {
    if (pointer.x > this.x 
        && pointer.y > this.y
        && pointer.x + pointer.w < this.w + this.x
        && pointer.y + pointer.h < this.h + this.y) {
          return true;
        }
  }