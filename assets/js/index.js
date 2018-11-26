window.onload = function () {
    var canvasElement = document.getElementById("my-canvas");
    //llamamos a nuestro juego y metemos un start
    new Game (canvasElement).start();
}