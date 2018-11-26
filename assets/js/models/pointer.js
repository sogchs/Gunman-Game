function Pointer (ctx) {
    this.ctx = ctx;

    this.w = 34;
    this.h = 34;

    this.img = new Image();
    this.img.src = "./assets/img/pointer.png";

    document.addEventListener('mousemove', function(event){
        this.x = event.clientX - this.w / 2;//le restamos la mitad de su ancho para que se centre al puntero
        this.y = event.clientY - this.h / 2;
    }.bind(this));

    this.actions = {shoot: false}

}


Pointer.prototype.draw = function() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
}

Pointer.prototype.onKeyEvent = function (event) {
    
    var state = event.type === 'keydown' ? true : false;
    switch (event.keyCode) {
      case KEY_S:
        this.actions.shoot = state;
        break;

    }
  }
  

