function Cowboy1 (ctx, x, y) {
    this.ctx = ctx;

    this.x = x || 0;
    this.y = y || 0;

    this.w = 65;
    this.h = 113;

    this.img = new Image();
    this.img.src = "./assets/img/cowboy1.png";

    this.holes = HOLES;

    // this.ctx.randomHoles();

}


Cowboy1.prototype.draw = function() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}


// Cowboy.prototype.randomHoles = function () {
//     this.holes.sort(function(){
//       return Math.floor(Math.random() * HOLES.length);
//     })
//   };
  