function Bird (ctx) {
    this.ctx = ctx;

    this.x = -75;
    this.y = 0;

    this.w = 75;
    this.h = 111;

    this.img = new Image();
    this.img.src = "./assets/img/bird.png";
    this.img.frames = 4;
    this.img.frameIndex = 0;
    this.drawCount = 0;

}


Bird.prototype.draw = function() {
    this.drawCount++;
    if (this.x < 1275) {
        this.x += 3;
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

Bird.prototype.animate = function() {
    this.img.frameIndex++;
    if (this.img.frameIndex === this.img.frames) {
      this.img.frameIndex = 0;
    }
}

Bird.prototype.onSamePositionBird = function(bird) {  
    return bird.x > this.x 
        && bird.y > this.y
        && bird.x + bird.w < this.w + this.x
        && bird.y + bird.h < this.h + this.y;       
}