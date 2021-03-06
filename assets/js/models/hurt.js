function Hurt (ctx) {
    this.ctx = ctx;

    this.w = 65;
    this.h = 65;

    this.img = new Image();
    this.img.src = "./assets/img/hurt.png";
    this.img.frames = 6;
    this.img.frameIndex = 0;
    this.drawCount = 0;

    document.addEventListener('mousemove', function(event){
        this.x = event.clientX - this.w / 2;//le restamos la mitad de su ancho para que se centre al puntero
        this.y = event.clientY - this.h / 2;
    }.bind(this)); 
}


Hurt.prototype.draw = function() {
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

Hurt.prototype.animate = function() {
    this.img.frameIndex++;
    if (this.img.frameIndex === this.img.frames) {
      this.img.frameIndex = 0;
    }
}