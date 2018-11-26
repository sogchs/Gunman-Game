function Cowboy1 (ctx) {
    this.ctx = ctx;

    //posición aleatoria
    var randomHole = HOLES[Math.floor(Math.random() * HOLES.length)];
    this.x = randomHole.x;
    this.y = randomHole.y;

    this.w = 65;
    this.h = 113;

    this.img = new Image();

    //obtener una imagen de cowboy aleatoria
    var n = [1, 2, 3];
    var nRamdom = n[Math.floor(Math.random() * n.length)];
    console.log(nRamdom);

    this.img.src = "./assets/img/cowboy" + nRamdom + ".png";

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