function Failure (ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;

    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.img = new Image();
    this.img.src = "./assets/img/failure.png";

}


Failure.prototype.draw = function() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}