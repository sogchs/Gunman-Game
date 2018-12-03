function Barrel (ctx) {
    this.ctx = ctx;

    this.x = 1278;
    this.y = 483;

    this.w = 90;
    this.h = 71;

    this.img = new Image();
    this.img.src = "./assets/img/barrel.png";
    this.img.frames = 4;
    this.img.frameIndex = 0;
    this.drawCount = 0;

}


Barrel.prototype.draw = function() {
    this.drawCount++;
    if (this.x > -90) {
        this.x -= 5;
    }
    
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
    
    if (this.drawCount % 5 === 0) {
      this.animate();
      this.drawCount = 0;
    }
}

Barrel.prototype.animate = function() {
    this.img.frameIndex++;
    if (this.img.frameIndex === this.img.frames) {
      this.img.frameIndex = 0;
    }
}