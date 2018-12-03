window.onload = function () {
    var canvasElement = document.getElementById("my-canvas");
    //llamamos a nuestro juego y metemos un start
    new Game (canvasElement).start();
          // volver a empezar desde el boton try again "No funciona"
          $("#try-again").click(function(){
            $('#pop-up').removeClass('pop-up-on').addClass('pop-up-off');
            new Game (canvasElement).start();
        });
}  

